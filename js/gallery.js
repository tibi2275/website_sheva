class PhotoGallery {
    constructor(container) {
        this.container = container;
        this.folderPath = container.dataset.folderPath || "./images";
        this.photoList = this.parsePhotoList(container.dataset.photos || "");
        this.photos = [];
        this.currentIndex = 0;
        this.slideInterval = null;
        this.isPaused = false;
        this.itemWidth = 430; // 400px + 30px margin
        this.visibleItems = 3;

        this.init();
    }

    // Parser la liste des photos depuis l'attribut data
    parsePhotoList(photosString) {
        if (!photosString.trim()) {
            // Liste par défaut si aucune liste n'est fournie
            return [
                "photo1.jpg",
                "photo2.jpg",
                "photo3.jpg",
                "photo4.jpg",
                "photo5.jpg",
            ];
        }

        // Diviser la chaîne par des virgules et nettoyer
        return photosString
            .split(",")
            .map((photo) => photo.trim())
            .filter((photo) => photo);
    }

    init() {
        this.loadPhotosFromList();
        this.calculateCenterOffset();
        this.currentIndex = this.photoList.length;
        this.createGalleryItems();
        this.setupEventListeners();
        this.calculateVisibleItems();
        this.updateGalleryPosition();
        this.startAutoSlide();
    }

    // Charger les photos à partir de la liste fournie
    loadPhotosFromList() {
        // Construire les chemins complets SANS mélanger
        const fullPaths = this.photoList.map(
            (photo) => `${this.folderPath}/${photo}`
        );
        this.photos = [...fullPaths, ...fullPaths]; // Dupliquer pour l'effet de boucle
    }

    // Calculer l'offset de centrage initial
    calculateCenterOffset() {
        if (this.container) {
            const containerWidth = this.container.offsetWidth;
            // Calculer le padding nécessaire pour centrer la première photo
            this.centerOffset = containerWidth / 2 - this.itemWidth / 2;
        }
    }

    // Calculer le nombre d'items visibles selon la largeur du conteneur
    calculateVisibleItems() {
        if (this.container) {
            const containerWidth = this.container.offsetWidth;
            this.visibleItems = Math.floor(containerWidth / this.itemWidth);
            if (this.visibleItems < 1) this.visibleItems = 1;
        }
    }

    // Démarrer le défilement automatique
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            if (!this.isPaused) {
                this.slideNext();
            }
        }, 5000); // 5 secondes
    }

    // Arrêter le défilement automatique
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    // Faire défiler vers l'item suivant (boucle sans à-coup)
    slideNext() {
        const N = this.photoList.length;
        const track = this.container.querySelector(".gallery-track");
        const nextIndex = this.currentIndex + 1;

        if (nextIndex >= this.photos.length) {
            // On dépasse la fin du tableau doublé :
            // saut silencieux vers la même photo dans la 1ère moitié,
            // puis animation normale vers la photo suivante
            const equivalentIndex = this.currentIndex - N;
            if (track) track.style.transition = "none";
            this.currentIndex = equivalentIndex;
            this.updateGalleryPosition();
            if (track) {
                track.getBoundingClientRect(); // force le reflow
                track.style.transition = ""; // restaure la transition CSS
            }
            this.currentIndex = equivalentIndex + 1;
        } else {
            this.currentIndex = nextIndex;
        }
        this.updateGalleryPosition();
    }

    // Faire défiler vers l'item précédent (boucle sans à-coup)
    slidePrev() {
        const N = this.photoList.length;
        const track = this.container.querySelector(".gallery-track");
        const prevIndex = this.currentIndex - 1;

        if (prevIndex < 0) {
            // On passe avant l'index 0 :
            // saut silencieux vers la même photo dans la 2ème moitié,
            // puis animation normale vers la photo précédente
            const equivalentIndex = this.currentIndex + N;
            if (track) track.style.transition = "none";
            this.currentIndex = equivalentIndex;
            this.updateGalleryPosition();
            if (track) {
                track.getBoundingClientRect(); // force le reflow
                track.style.transition = ""; // restaure la transition CSS
            }
            this.currentIndex = equivalentIndex - 1;
        } else {
            this.currentIndex = prevIndex;
        }
        this.updateGalleryPosition();
    }

    // Mettre à jour la position de la galerie
    updateGalleryPosition() {
        const track = this.container.querySelector(".gallery-track");
        if (track) {
            // Recalcul dynamique pour éviter tout décalage dû à un reflow ou
            // un changement de largeur (scrollbar, resize) après l'init
            const containerWidth = this.container.offsetWidth;
            const centerOffset = containerWidth / 2 - this.itemWidth / 2;
            const translateX = Math.round(
                centerOffset - this.currentIndex * this.itemWidth
            );
            track.style.transform = `translateX(${translateX}px)`;
        }
    }

    // Créer les éléments de la galerie
    createGalleryItems() {
        const track = this.container.querySelector(".gallery-track");
        if (!track) return;

        track.innerHTML = "";

        this.photos.forEach((photo, index) => {
            const item = document.createElement("div");
            item.className = "gallery-item";
            item.innerHTML = `<img src="${photo}" alt="Photo ${
                index + 1
            }" loading="lazy">`;
            track.appendChild(item);
        });
    }

    // Configuration des événements
    setupEventListeners() {
        if (!this.container) return;

        // Pause du défilement au survol
        this.container.addEventListener("mouseenter", () => {
            this.isPaused = true;
        });

        this.container.addEventListener("mouseleave", () => {
            this.isPaused = false;
        });

        // Recalculer lors du redimensionnement
        window.addEventListener("resize", () => {
            this.calculateVisibleItems();
            this.calculateCenterOffset();
            this.updateGalleryPosition();
        });

        // Gérer les clics sur les boutons de navigation
        const prevBtn = this.container.querySelector(".gallery-nav.prev");
        const nextBtn = this.container.querySelector(".gallery-nav.next");

        if (prevBtn) {
            prevBtn.addEventListener("click", () => this.navigateGallery(-1));
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => this.navigateGallery(1));
        }
    }

    // Navigation dans la galerie principale
    navigateGallery(direction) {
        if (direction > 0) {
            this.slideNext();
        } else {
            this.slidePrev();
        }

        // Redémarrer le timer pour éviter un conflit
        this.stopAutoSlide();
        this.startAutoSlide();
    }

    // Nettoyer les timers lors de la destruction
    destroy() {
        this.stopAutoSlide();
    }
}

// Initialisation automatique pour toutes les galeries
document.addEventListener("DOMContentLoaded", () => {
    // Trouver toutes les galeries sur la page
    const galleries = document.querySelectorAll(".photo-gallery-container");

    galleries.forEach((gallery) => {
        new PhotoGallery(gallery);
    });
});

// Export pour les modules ES6 (optionnel)
if (typeof module !== "undefined" && module.exports) {
    module.exports = PhotoGallery;
}
