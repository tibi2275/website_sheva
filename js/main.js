/**
 * SCRIPTS PRINCIPAUX SHEVA
 * Gestion des animations, interactions et fonctionnalités du site
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("🐎 Site SHEVA chargé avec succès !");

    // Initialisation des fonctionnalités
    initScrollAnimations();
    initSmoothScrolling();
    initLazyLoading();
    initContactForm();

    // Message de bienvenue (optionnel)
    if (sessionStorage.getItem("welcomeShown") !== "true") {
        console.log("Bienvenue au centre équestre SHEVA !");
        sessionStorage.setItem("welcomeShown", "true");
    }
});

/**
 * Animations au scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                // Animation spéciale pour les compteurs
                if (entry.target.classList.contains("stat-card")) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        ".preview-card, .news-card, .stat-card, .content-card"
    );
    elementsToAnimate.forEach((el) => {
        // Style initial pour l'animation
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease-out";

        // Observer l'élément
        observer.observe(el);
    });
}

/**
 * Animation des compteurs numériques
 */
function animateCounter(element) {
    const numberElement = element.querySelector(".stat-number");
    if (!numberElement) return;

    const originalText = numberElement.textContent;
    const targetValue = originalText.replace(/\D/g, "");
    if (!targetValue) return;

    const target = parseInt(targetValue);
    const units = originalText.replace(/^\d+/, ""); // Correction ici

    const duration = 1000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(current) + units;
    }, 16);
}

/**
 * Défilement fluide pour les ancres
 */
function initSmoothScrolling() {
    // Gestion des liens internes
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                const headerHeight =
                    document.querySelector(".header").offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });
}

/**
 * Lazy loading pour les images (préparation)
 */
function initLazyLoading() {
    // Configuration pour le lazy loading des futures images
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy");
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        // Observer toutes les images avec data-src
        document.querySelectorAll("img[data-src]").forEach((img) => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Gestion des formulaires de contact
 */
function initContactForm() {
    const contactForms = document.querySelectorAll(".contact-form form");

    contactForms.forEach((form) => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Validation simple
            const requiredFields = form.querySelectorAll("[required]");
            let isValid = true;

            requiredFields.forEach((field) => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = "#dc3545";
                } else {
                    field.style.borderColor = "#4a7c59";
                }
            });

            if (isValid) {
                // Simulation d'envoi
                const submitBtn = form.querySelector(".btn-submit");
                const originalText = submitBtn.textContent;

                submitBtn.textContent = "Envoi en cours...";
                submitBtn.disabled = true;

                setTimeout(() => {
                    showNotification("Message envoyé avec succès !", "success");
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                showNotification(
                    "Veuillez remplir tous les champs obligatoires",
                    "error"
                );
            }
        });
    });
}

/**
 * Système de notifications
 */
function showNotification(message, type = "info") {
    // Créer la notification
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Styles inline pour la notification
    Object.assign(notification.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        background:
            type === "success"
                ? "#4a7c59"
                : type === "error"
                ? "#dc3545"
                : "#2d5016",
        color: "white",
        padding: "1rem 1.5rem",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        zIndex: "1000",
        transform: "translateX(400px)",
        transition: "transform 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    });

    // Bouton de fermeture
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: 0.5rem;
    `;

    // Ajouter au DOM
    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 100);

    // Fermeture automatique et manuelle
    const closeNotification = () => {
        notification.style.transform = "translateX(400px)";
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    };

    closeBtn.addEventListener("click", closeNotification);
    setTimeout(closeNotification, 5000); // Auto-fermeture après 5s
}

/**
 * Gestion des images d'erreur
 */
function handleImageError() {
    document.addEventListener(
        "error",
        function (e) {
            if (e.target.tagName === "IMG") {
                e.target.style.display = "none";
                console.warn("Image non trouvée:", e.target.src);
            }
        },
        true
    );
}

/**
 * Optimisation des performances
 */
function optimizePerformance() {
    // Lazy loading des iframes
    const iframes = document.querySelectorAll("iframe[data-src]");
    const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                iframeObserver.unobserve(iframe);
            }
        });
    });

    iframes.forEach((iframe) => iframeObserver.observe(iframe));

    // Préchargement des pages importantes
    const importantLinks = document.querySelectorAll(
        'a[href*="centre.html"], a[href*="activites.html"]'
    );
    importantLinks.forEach((link) => {
        link.addEventListener(
            "mouseenter",
            function () {
                const linkElement = document.createElement("link");
                linkElement.rel = "prefetch";
                linkElement.href = this.href;
                document.head.appendChild(linkElement);
            },
            { once: true }
        );
    });
}

/**
 * Accessibilité améliorée
 */
function improveAccessibility() {
    // Gestion du focus pour les utilisateurs au clavier
    document.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            document.body.classList.add("using-keyboard");
        }
    });

    document.addEventListener("mousedown", function () {
        document.body.classList.remove("using-keyboard");
    });

    // Skip link pour la navigation
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.textContent = "Aller au contenu principal";
    skipLink.className = "skip-link";
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2d5016;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;

    skipLink.addEventListener("focus", function () {
        this.style.top = "6px";
    });

    skipLink.addEventListener("blur", function () {
        this.style.top = "-40px";
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialisation des fonctionnalités supplémentaires
document.addEventListener("DOMContentLoaded", function () {
    handleImageError();
    optimizePerformance();
    improveAccessibility();
});

// Gestion des erreurs globales
window.addEventListener("error", function (e) {
    console.error("Erreur JavaScript:", e.error);
    // En production, vous pourriez envoyer cette erreur à un service de monitoring
});

// Export des fonctions pour usage externe si nécessaire
window.ShevaUtils = {
    showNotification,
    animateCounter,
};

document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopBtn = document.getElementById("scrollToTop");

    // Afficher/masquer selon la position
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    // Remonter en haut au clic
    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});

/* ===== JAVASCRIPT POPUP NOTICES D'INSCRIPTION ===== */

// Ouvrir la popup
function openNoticesPopup() {
    const popup = document.getElementById("noticesPopup");
    popup.classList.add("active");
    document.body.style.overflow = "hidden"; // Empêche le scroll du body
}

// Fermer la popup
function closeNoticesPopup() {
    const popup = document.getElementById("noticesPopup");
    popup.classList.remove("active");
    document.body.style.overflow = ""; // Réactive le scroll
}

// Fermer avec la touche Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeNoticesPopup();
    }
});

// Fermer en cliquant à l'extérieur
document.addEventListener("click", function (event) {
    const popup = document.getElementById("noticesPopup");
    if (event.target === popup) {
        closeNoticesPopup();
    }
});
