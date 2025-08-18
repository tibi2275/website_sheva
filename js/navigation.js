/**
 * NAVIGATION SHEVA
 * Gestion du menu, navigation mobile et interactions
 */

document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initActiveNavigation();
    initDropdownMenus();
    initScrollHeader();
    initKeyboardNavigation();
    initBreadcrumb();
    initSiteSearch();
    initExternalLinks();
});

/**
 * Gestion du menu mobile avec animations améliorées
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById("mobileToggle");
    const navMain = document.getElementById("navMain");

    if (mobileToggle && navMain) {
        // Toggle du menu mobile
        mobileToggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            navMain.classList.toggle("active");

            // Animation du bouton hamburger
            this.textContent = navMain.classList.contains("active") ? "✕" : "☰";

            // Gestion du scroll et overlay
            if (navMain.classList.contains("active")) {
                document.body.classList.add("menu-open");
                document.body.style.overflow = "hidden";
                // Focus sur le premier lien pour l'accessibilité
                const firstLink = navMain.querySelector("a");
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 300);
                }
            } else {
                closeMenu();
            }
        });

        // Fermeture du menu en cliquant en dehors
        document.addEventListener("click", function (e) {
            if (
                navMain.classList.contains("active") &&
                !navMain.contains(e.target) &&
                !mobileToggle.contains(e.target)
            ) {
                closeMenu();
            }
        });

        // Fermeture du menu avec Escape
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && navMain.classList.contains("active")) {
                closeMenu();
                mobileToggle.focus();
            }
        });

        // Fermeture du menu lors du redimensionnement
        window.addEventListener("resize", function () {
            if (
                window.innerWidth > 768 &&
                navMain.classList.contains("active")
            ) {
                closeMenu();
            }
        });

        // Fermeture du menu sur les liens de navigation
        const navLinks = navMain.querySelectorAll("a");
        navLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                // Ne pas fermer si c'est un lien avec dropdown
                if (
                    !this.closest(".dropdown-parent") ||
                    this.closest(".dropdown")
                ) {
                    // Fermer le menu mobile après un délai pour permettre la navigation
                    setTimeout(() => {
                        closeMenu();
                    }, 100);
                }
            });
        });

        /**
         * Fonction utilitaire pour fermer le menu
         */
        function closeMenu() {
            navMain.classList.remove("active");
            mobileToggle.textContent = "☰";
            document.body.classList.remove("menu-open");
            document.body.style.overflow = "";
        }

        // Stocker la fonction pour usage externe
        window.ShevaNavigation.closeMenu = closeMenu;
    }
}

/**
 * Gestion de la navigation active avec amélioration
 */
function initActiveNavigation() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach((link) => {
        // Retirer toutes les classes active
        link.classList.remove("active");

        // Ajouter la classe active au lien correspondant
        const linkPath = getLinkPath(link.getAttribute("href"));
        if (linkPath === currentPage) {
            link.classList.add("active");
            // Marquer aussi le parent dropdown comme actif
            const dropdownParent = link.closest(".dropdown-parent");
            if (dropdownParent) {
                const parentLink =
                    dropdownParent.querySelector("a:first-child");
                if (parentLink) {
                    parentLink.classList.add("active");
                }
            }
        }
    });
}

/**
 * Obtenir la page actuelle avec gestion des cas edge
 */
function getCurrentPage() {
    const path = window.location.pathname;

    // Cas de la page d'accueil
    if (path === "/" || path.endsWith("/index.html") || path.endsWith("/")) {
        return "index";
    }

    // Extraire le nom de la page
    const pageName = path.split("/").pop().replace(".html", "");
    return pageName || "index";
}

/**
 * Obtenir le chemin d'un lien avec normalisation
 */
function getLinkPath(href) {
    if (!href) return "";

    // Normaliser les liens vers l'accueil
    if (
        href === "index.html" ||
        href === "/" ||
        href === "./" ||
        href === "../index.html"
    ) {
        return "index";
    }

    // Gérer les liens avec pages/
    if (href.includes("pages/")) {
        return href.split("pages/")[1].replace(".html", "").split("#")[0];
    }

    // Gérer les liens relatifs
    if (href.startsWith("../pages/")) {
        return href.replace("../pages/", "").replace(".html", "").split("#")[0];
    }

    // Cas général
    return href.replace(".html", "").split("/").pop().split("#")[0];
}

/**
 * Gestion des menus déroulants avec amélioration mobile
 */
function initDropdownMenus() {
    const dropdownParents = document.querySelectorAll(".dropdown-parent");

    dropdownParents.forEach((parent) => {
        const dropdown = parent.querySelector(".dropdown");
        const parentLink = parent.querySelector("a:first-child");
        if (!dropdown || !parentLink) return;

        let timeoutId;
        let isTouchDevice = false;

        // Détecter si c'est un appareil tactile
        parent.addEventListener(
            "touchstart",
            function () {
                isTouchDevice = true;
            },
            { once: true }
        );

        // Affichage du dropdown au survol (desktop seulement)
        parent.addEventListener("mouseenter", function () {
            if (!isTouchDevice && window.innerWidth > 768) {
                clearTimeout(timeoutId);
                showDropdown(dropdown);
            }
        });

        // Masquage du dropdown avec délai (desktop seulement)
        parent.addEventListener("mouseleave", function () {
            if (!isTouchDevice && window.innerWidth > 768) {
                timeoutId = setTimeout(() => {
                    hideDropdown(dropdown);
                }, 150);
            }
        });

        // Gestion tactile pour mobile et tablette
        parentLink.addEventListener("click", function (e) {
            if (isTouchDevice || window.innerWidth <= 768) {
                e.preventDefault();

                const isVisible =
                    dropdown.style.opacity === "1" ||
                    dropdown.classList.contains("show");

                // Fermer tous les autres dropdowns
                document
                    .querySelectorAll(".dropdown")
                    .forEach((otherDropdown) => {
                        if (otherDropdown !== dropdown) {
                            hideDropdown(otherDropdown);
                        }
                    });

                // Toggle le dropdown actuel
                if (isVisible) {
                    hideDropdown(dropdown);
                } else {
                    showDropdown(dropdown);
                }
            }
        });

        // Navigation au clavier dans les dropdowns
        parentLink.addEventListener("keydown", function (e) {
            if (e.key === "ArrowDown" || e.key === "Enter") {
                e.preventDefault();
                showDropdown(dropdown);
                const firstDropdownLink = dropdown.querySelector("a");
                if (firstDropdownLink) {
                    firstDropdownLink.focus();
                }
            }
        });

        // Navigation au clavier dans les liens du dropdown
        const dropdownLinks = dropdown.querySelectorAll("a");
        dropdownLinks.forEach((link, index) => {
            link.addEventListener("keydown", function (e) {
                switch (e.key) {
                    case "ArrowDown":
                        e.preventDefault();
                        const nextIndex = (index + 1) % dropdownLinks.length;
                        dropdownLinks[nextIndex].focus();
                        break;
                    case "ArrowUp":
                        e.preventDefault();
                        const prevIndex =
                            (index - 1 + dropdownLinks.length) %
                            dropdownLinks.length;
                        dropdownLinks[prevIndex].focus();
                        break;
                    case "Escape":
                        e.preventDefault();
                        hideDropdown(dropdown);
                        parentLink.focus();
                        break;
                }
            });
        });
    });

    // Fermer les dropdowns en cliquant ailleurs
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown-parent")) {
            document.querySelectorAll(".dropdown").forEach((dropdown) => {
                hideDropdown(dropdown);
            });
        }
    });

    /**
     * Afficher un dropdown
     */
    function showDropdown(dropdown) {
        dropdown.style.opacity = "1";
        dropdown.style.visibility = "visible";
        dropdown.style.transform = "translateY(0)";
        dropdown.classList.add("show");
    }

    /**
     * Masquer un dropdown
     */
    function hideDropdown(dropdown) {
        dropdown.style.opacity = "0";
        dropdown.style.visibility = "hidden";
        dropdown.style.transform = "translateY(-10px)";
        dropdown.classList.remove("show");
    }
}

/**
 * Header qui se cache/montre au scroll avec amélioration
 */
function initScrollHeader() {
    const header = document.querySelector(".header");
    if (!header) return;

    let lastScrollTop = 0;
    let isScrolling = false;
    let scrollThreshold = 100;

    window.addEventListener("scroll", function () {
        if (!isScrolling) {
            window.requestAnimationFrame(function () {
                const scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;

                // Ne pas cacher le header si le menu mobile est ouvert
                const navMain = document.getElementById("navMain");
                if (navMain && navMain.classList.contains("active")) {
                    return;
                }

                // Si on scroll vers le bas et qu'on a scrollé plus que le seuil
                if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                    header.style.transform = "translateY(-100%)";
                    header.style.transition = "transform 0.3s ease";
                } else {
                    header.style.transform = "translateY(0)";
                    header.style.transition = "transform 0.3s ease";
                }

                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Pour mobile
                isScrolling = false;
            });
        }
        isScrolling = true;
    });
}

/**
 * Navigation au clavier améliorée
 */
function initKeyboardNavigation() {
    const navLinks = document.querySelectorAll(".nav-menu > li > a");

    navLinks.forEach((link, index) => {
        link.addEventListener("keydown", function (e) {
            switch (e.key) {
                case "ArrowRight":
                    e.preventDefault();
                    const nextIndex = (index + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                    break;

                case "ArrowLeft":
                    e.preventDefault();
                    const prevIndex =
                        (index - 1 + navLinks.length) % navLinks.length;
                    navLinks[prevIndex].focus();
                    break;

                case "Escape":
                    e.preventDefault();
                    link.blur();
                    // Fermer le menu mobile si ouvert
                    if (window.ShevaNavigation.closeMenu) {
                        window.ShevaNavigation.closeMenu();
                    }
                    break;

                case "Home":
                    e.preventDefault();
                    navLinks[0].focus();
                    break;

                case "End":
                    e.preventDefault();
                    navLinks[navLinks.length - 1].focus();
                    break;
            }
        });
    });
}

/**
 * Breadcrumb automatique avec amélioration
 */
function initBreadcrumb() {
    const breadcrumbContainer = document.querySelector(".breadcrumb");
    if (!breadcrumbContainer) return;

    const currentPage = getCurrentPage();
    const pageNames = {
        index: "Accueil",
        centre: "Le centre équestre",
        activites: "Les activités",
        chevaux: "Chevaux & poneys",
        planning: "Planning & tarifs",
        infos: "Infos pratiques",
        compte: "Mon compte",
    };

    let breadcrumbHTML =
        '<a href="../index.html" aria-label="Retour à l\'accueil">Accueil</a>';

    if (currentPage !== "index") {
        const currentPageName = pageNames[currentPage] || currentPage;
        breadcrumbHTML += ` <span class="separator" aria-hidden="true">></span> <span class="current" aria-current="page">${currentPageName}</span>`;
    }

    breadcrumbContainer.innerHTML = breadcrumbHTML;
    breadcrumbContainer.setAttribute("aria-label", "Fil d'Ariane");
}

/**
 * Recherche dans le site avec debounce
 */
function initSiteSearch() {
    const searchInput = document.querySelector(".site-search input");
    if (!searchInput) return;

    let searchTimeout;

    searchInput.addEventListener("input", function () {
        clearTimeout(searchTimeout);
        const query = this.value.trim();

        if (query.length > 2) {
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        } else if (query.length === 0) {
            clearSearchResults();
        }
    });

    // Recherche en appuyant sur Entrée
    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = this.value.trim();
            if (query.length > 0) {
                performSearch(query);
            }
        }
    });
}

/**
 * Fonction de recherche avec suggestions
 */
function performSearch(query) {
    console.log("Recherche:", query);

    // Exemple de données de recherche (à remplacer par vos vraies données)
    const searchData = [
        { title: "Accueil", url: "../index.html", type: "page" },
        {
            title: "Le centre équestre",
            url: "../pages/centre.html",
            type: "page",
        },
        {
            title: "Les activités",
            url: "../pages/activites.html",
            type: "page",
        },
        {
            title: "Chevaux & poneys",
            url: "../pages/chevaux.html",
            type: "page",
        },
        {
            title: "Planning & tarifs",
            url: "../pages/planning.html",
            type: "page",
        },
        { title: "Infos pratiques", url: "../pages/infos.html", type: "page" },
    ];

    const results = searchData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    displaySearchResults(results, query);
}

/**
 * Afficher les résultats de recherche
 */
function displaySearchResults(results, query) {
    let resultsContainer = document.querySelector(".search-results");

    if (!resultsContainer) {
        resultsContainer = document.createElement("div");
        resultsContainer.className = "search-results";
        const searchInput = document.querySelector(".site-search input");
        if (searchInput) {
            searchInput.parentNode.appendChild(resultsContainer);
        }
    }

    if (results.length === 0) {
        resultsContainer.innerHTML = `<p>Aucun résultat pour "${query}"</p>`;
    } else {
        let html = `<h3>Résultats pour "${query}":</h3><ul>`;
        results.forEach((result) => {
            html += `<li><a href="${result.url}">${result.title}</a></li>`;
        });
        html += "</ul>";
        resultsContainer.innerHTML = html;
    }

    resultsContainer.style.display = "block";
}

/**
 * Effacer les résultats de recherche
 */
function clearSearchResults() {
    const resultsContainer = document.querySelector(".search-results");
    if (resultsContainer) {
        resultsContainer.style.display = "none";
    }
}

/**
 * Gestion des liens externes avec sécurité
 */
function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');

    externalLinks.forEach((link) => {
        // Ignorer les liens internes
        if (link.href.includes(window.location.hostname)) {
            return;
        }

        // Ajouter target="_blank" et rel="noopener noreferrer" pour la sécurité
        if (!link.hasAttribute("target")) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }

        // Ajouter un attribut aria-label informatif
        if (!link.hasAttribute("aria-label")) {
            link.setAttribute(
                "aria-label",
                `${link.textContent} (s'ouvre dans un nouvel onglet)`
            );
        }

        // Ajouter une icône pour indiquer que c'est un lien externe
        if (!link.querySelector(".external-icon")) {
            const icon = document.createElement("span");
            icon.className = "external-icon";
            icon.innerHTML = "↗";
            icon.style.fontSize = "0.8em";
            icon.style.marginLeft = "0.3em";
            icon.setAttribute("aria-hidden", "true");
            link.appendChild(icon);
        }
    });
}

/**
 * Initialisation du thème sombre (optionnel)
 */
function initThemeToggle() {
    const themeToggle = document.querySelector(".theme-toggle");
    if (!themeToggle) return;

    // Récupérer le thème sauvegardé
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    themeToggle.addEventListener("click", function () {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        this.textContent = newTheme === "light" ? "🌙" : "☀️";
    });
}

/**
 * Gestion de la performance et optimisations
 */
function initPerformanceOptimizations() {
    // Lazy loading pour les images
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove("lazy");
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach((img) => imageObserver.observe(img));
    }

    // Preload des pages importantes
    const importantLinks = document.querySelectorAll(
        'a[href$=".html"]:not([href^="http"])'
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

// Export des fonctions pour usage externe
window.ShevaNavigation = {
    getCurrentPage,
    getLinkPath,
    initActiveNavigation,
    performSearch,
    closeMenu: null, // Sera défini dans initMobileMenu
    displaySearchResults,
    clearSearchResults,
};

// Initialisation des optimisations de performance
document.addEventListener("DOMContentLoaded", function () {
    initPerformanceOptimizations();
    initThemeToggle();
});

// Gestion des erreurs JavaScript
window.addEventListener("error", function (e) {
    console.warn("Erreur JavaScript capturée:", e.error);
    // Optionnel: envoyer l'erreur à un service de monitoring
});

// Service Worker pour le cache (optionnel)
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => console.log("SW registered"))
            .catch((error) => console.log("SW registration failed"));
    });
}
