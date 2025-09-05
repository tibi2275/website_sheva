document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.getElementById("downloadBtn");
    const popup = document.getElementById("downloadPopup");
    const closeBtn = document.getElementById("closePopup");

    // Ouvrir la popup
    if (downloadBtn) {
        downloadBtn.addEventListener("click", function (e) {
            e.preventDefault();
            popup.style.display = "block";
            // Petit délai pour que l'animation CSS fonctionne
            setTimeout(() => {
                popup.classList.add("show");
            }, 10);
        });
    }

    // Fermer la popup
    function closePopup() {
        popup.classList.remove("show");
        // Attendre la fin de l'animation avant de cacher
        setTimeout(() => {
            popup.style.display = "none";
        }, 300);
    }

    // Fermer avec le bouton X
    if (closeBtn) {
        closeBtn.addEventListener("click", closePopup);
    }

    // Fermer en cliquant sur l'overlay
    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && popup.style.display === "block") {
            closePopup();
        }
    });
});
