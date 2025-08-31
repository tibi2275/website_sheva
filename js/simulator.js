// ===== SIMULATEUR DE TARIFS - VERSION FORFAITS =====

// Configuration des reprises par niveau (à personnaliser avec vos vraies reprises)
const reprisesByLevel = {
    debutant: [
        {
            id: "deb_mer_14h",
            day: "Mercredi",
            time: "14h00",
            instructor: "Sophie",
        },
        { id: "deb_sam_10h", day: "Samedi", time: "10h00", instructor: "Marc" },
        {
            id: "deb_sam_16h",
            day: "Samedi",
            time: "16h00",
            instructor: "Julie",
        },
    ],
    bronze: [
        {
            id: "bronze_mar_17h",
            day: "Mardi",
            time: "17h00",
            instructor: "Sophie",
        },
        {
            id: "bronze_mer_16h",
            day: "Mercredi",
            time: "16h00",
            instructor: "Pierre",
        },
        {
            id: "bronze_sam_14h",
            day: "Samedi",
            time: "14h00",
            instructor: "Marc",
        },
    ],
    argent: [
        {
            id: "argent_mer_18h",
            day: "Mercredi",
            time: "18h00",
            instructor: "Pierre",
        },
        {
            id: "argent_ven_17h",
            day: "Vendredi",
            time: "17h00",
            instructor: "Sophie",
        },
        {
            id: "argent_sam_16h",
            day: "Samedi",
            time: "16h00",
            instructor: "Julie",
        },
    ],
    or: [
        { id: "or_mar_19h", day: "Mardi", time: "19h00", instructor: "Pierre" },
        { id: "or_jeu_18h", day: "Jeudi", time: "18h00", instructor: "Marc" },
        {
            id: "or_sam_18h",
            day: "Samedi",
            time: "18h00",
            instructor: "Sophie",
        },
    ],
    galop1: [
        {
            id: "g1_mer_14h",
            day: "Mercredi",
            time: "14h30",
            instructor: "Julie",
        },
        { id: "g1_sam_9h", day: "Samedi", time: "09h00", instructor: "Marc" },
        {
            id: "g1_dim_10h",
            day: "Dimanche",
            time: "10h00",
            instructor: "Sophie",
        },
    ],
    galop2: [
        { id: "g2_mar_16h", day: "Mardi", time: "16h30", instructor: "Pierre" },
        {
            id: "g2_mer_15h",
            day: "Mercredi",
            time: "15h30",
            instructor: "Julie",
        },
        { id: "g2_sam_11h", day: "Samedi", time: "11h00", instructor: "Marc" },
    ],
    galop3: [
        { id: "g3_mar_17h", day: "Mardi", time: "17h30", instructor: "Sophie" },
        { id: "g3_jeu_16h", day: "Jeudi", time: "16h30", instructor: "Pierre" },
        { id: "g3_sam_15h", day: "Samedi", time: "15h00", instructor: "Julie" },
    ],
    galop4: [
        { id: "g4_lun_18h", day: "Lundi", time: "18h00", instructor: "Marc" },
        {
            id: "g4_mer_17h",
            day: "Mercredi",
            time: "17h30",
            instructor: "Pierre",
        },
        {
            id: "g4_sam_13h",
            day: "Samedi",
            time: "13h30",
            instructor: "Sophie",
        },
    ],
    galop5: [
        { id: "g5_mar_18h", day: "Mardi", time: "18h30", instructor: "Pierre" },
        { id: "g5_jeu_17h", day: "Jeudi", time: "17h30", instructor: "Marc" },
        {
            id: "g5_dim_14h",
            day: "Dimanche",
            time: "14h00",
            instructor: "Julie",
        },
    ],
    galop6: [
        { id: "g6_lun_19h", day: "Lundi", time: "19h00", instructor: "Sophie" },
        {
            id: "g6_mer_19h",
            day: "Mercredi",
            time: "19h00",
            instructor: "Pierre",
        },
        { id: "g6_sam_17h", day: "Samedi", time: "17h00", instructor: "Marc" },
    ],
    galop7: [
        { id: "g7_mar_20h", day: "Mardi", time: "20h00", instructor: "Pierre" },
        {
            id: "g7_mer_19h30",
            day: "Mercredi",
            time: "19h30",
            instructor: "Marc",
        },
        {
            id: "g7_sam_11h30",
            day: "Samedi",
            time: "11h30",
            instructor: "Sophie",
        },
    ],
};

// Configuration des forfaits (à adapter selon vos vrais tarifs)
const forfaitsPricing = {
    baby: {
        name: "Baby",
        price: 180,
        description: "Parfait pour débuter en douceur",
        icon: "🍼",
    },
    poney_debutant: {
        name: "Poney Débutant",
        price: 220,
        description: "Apprentissage des bases avec les poneys",
        icon: "🐴",
    },
    poney: {
        name: "Poney",
        price: 280,
        description: "Perfectionnement avec les poneys",
        icon: "🏇",
    },
    cheval_under16: {
        name: "Cheval <16 ans",
        price: 320,
        description: "Équitation avec les chevaux pour les jeunes",
        icon: "🐎",
    },
    cheval_over16: {
        name: "Cheval >16 ans",
        price: 380,
        description: "Équitation avec les chevaux pour les adultes",
        icon: "🏆",
    },
    perfectionnement: {
        name: "Perfectionnement 1h30",
        price: 450,
        description: "Cours de perfectionnement de 1h30",
        icon: "⭐",
    },
};

// Configuration des cotisations et licences
const fees = {
    cotisation: {
        under16: 128,
        over16: 155,
    },
    licence: {
        under18: 29,
        over18: 40,
    },
};

// Initialisation du simulateur
function initSimulator() {
    const openBtn = document.getElementById("openSimulator");
    const popup = document.getElementById("popupOverlay");
    const closeBtn = document.getElementById("closeBtn");
    const memberCountInput = document.getElementById("memberCount");
    const membersContainer = document.getElementById("membersContainer");
    const form = document.getElementById("simulatorForm");
    const resultContainer = document.getElementById("resultContainer");
    const resultPrice = document.getElementById("resultPrice");
    const resultDetails = document.getElementById("resultDetails");

    if (!openBtn) return;

    // Event listeners principaux
    openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        popup.style.display = "block";
        generateMemberForms();
    });

    closeBtn.addEventListener("click", closePopup);
    popup.addEventListener("click", function (e) {
        if (e.target === popup) closePopup();
    });

    memberCountInput.addEventListener("input", generateMemberForms);
    form.addEventListener("submit", handleFormSubmit);

    function closePopup() {
        popup.style.display = "none";
        resultContainer.style.display = "none";
    }

    function getRecommendation(age) {
        if (age >= 4 && age <= 6) {
            return {
                type: "baby",
                message: "🍼 Âge parfait pour le forfait Baby !",
                showLevel: false,
                showMorphology: false,
            };
        } else if (age >= 7 && age <= 9) {
            return {
                type: "poney",
                message: "🐴 Âge adapté pour les forfaits Poney !",
                showLevel: true,
                showMorphology: false,
            };
        } else if (age >= 10 && age <= 12) {
            return {
                type: "intermediate",
                message:
                    "📏 Nous devons vérifier votre taille et poids pour choisir le bon type de monture.",
                showLevel: false,
                showMorphology: true,
            };
        } else if (age > 12) {
            return {
                type: "cheval",
                message: "🐎 Âge adapté pour les forfaits Cheval !",
                showLevel: true,
                showMorphology: false,
            };
        }
    }

    function determineMountType(height, weight) {
        if (height > 1.5 || weight > 60) {
            return {
                type: "cheval",
                message:
                    "🐎 Votre morphologie correspond aux forfaits Cheval !",
            };
        } else {
            return {
                type: "poney",
                message: "🐴 Votre morphologie correspond aux forfaits Poney !",
            };
        }
    }

    function getAvailableForfaits(age, level, mountType) {
        let availableForfaits = [];

        if (age >= 4 && age <= 6) {
            availableForfaits = ["baby"];
        } else if (
            (age >= 7 && age <= 9) ||
            (age >= 10 && age <= 12 && mountType === "poney")
        ) {
            if (level === "debutant") {
                availableForfaits = ["poney_debutant"];
            } else if (
                level === "bronze" ||
                level === "argent" ||
                level === "or"
            ) {
                availableForfaits = ["poney"];
            }
        } else if (
            age >= 13 ||
            (age >= 10 && age <= 12 && mountType === "cheval")
        ) {
            if (age < 16) {
                availableForfaits = ["cheval_under16"];
                if (level === "galop7") {
                    availableForfaits.push("perfectionnement");
                }
            } else {
                availableForfaits = ["cheval_over16"];
                if (level === "galop7") {
                    availableForfaits.push("perfectionnement");
                }
            }
        }

        return availableForfaits;
    }

    function generateMemberForms() {
        const count = parseInt(memberCountInput.value) || 1;
        membersContainer.innerHTML = "";

        for (let i = 1; i <= count; i++) {
            const memberCard = document.createElement("div");
            memberCard.className = "member-card";
            memberCard.innerHTML = `
                <div class="member-title">👤 Membre ${i}</div>
                <div class="member-form">
                    <div class="form-group">
                        <label for="age${i}">Âge :</label>
                        <input type="number" id="age${i}" min="4" max="99" required placeholder="Ex: 8">
                        <div class="input-hint">📅 À partir de 4 ans</div>
                    </div>
                    
                    <div class="recommendation-box" id="recommendation${i}" style="display: none;">
                        <div class="recommendation-text"></div>
                    </div>
                    
                    <div class="morphology-group" id="morphologyGroup${i}" style="display: none;">
                        <div class="form-group">
                            <label for="height${i}">Taille (en mètres) :</label>
                            <input type="number" id="height${i}" min="1" max="2" step="0.01" placeholder="Ex: 1.45">
                            <div class="input-hint">📏 Votre taille en mètres (ex: 1.45)</div>
                        </div>
                        <div class="form-group">
                            <label for="weight${i}">Poids (en kg) :</label>
                            <input type="number" id="weight${i}" min="20" max="150" placeholder="Ex: 45">
                            <div class="input-hint">⚖️ Votre poids en kilogrammes</div>
                        </div>
                    </div>
                    
                    <div class="mount-type-box" id="mountType${i}" style="display: none;">
                        <div class="mount-type-text"></div>
                    </div>
                    
                    <div class="form-group level-group" id="levelGroup${i}" style="display: none;">
                        <label for="level${i}">Niveau acquis :</label>
                        <select id="level${i}">
                            <option value="">🎯 Sélectionner le niveau...</option>
                        </select>
                        <div class="input-hint">🏇 Choisissez votre niveau actuel</div>
                    </div>
                    
                    <div class="form-group forfait-group" id="forfaitGroup${i}" style="display: none;">
                        <label>Choisir un forfait :</label>
                        <div class="forfait-cards" id="forfaitCards${i}">
                        </div>
                        <div class="input-hint">💡 Cliquez sur le forfait de votre choix</div>
                        <input type="hidden" id="forfait${i}" required>
                    </div>
                    
                    <div class="form-group reprise-group" id="repriseGroup${i}" style="display: none;">
                        <label>Choisir une reprise :</label>
                        <div class="reprise-cards" id="repriseCards${i}">
                        </div>
                        <div class="input-hint">🕐 Sélectionnez votre créneau préféré</div>
                        <input type="hidden" id="reprise${i}" required>
                    </div>
                </div>
            `;
            membersContainer.appendChild(memberCard);
            setupMemberEventListeners(i);
        }
    }

    function setupMemberEventListeners(memberIndex) {
        const ageInput = document.getElementById(`age${memberIndex}`);
        const levelSelect = document.getElementById(`level${memberIndex}`);
        const heightInput = document.getElementById(`height${memberIndex}`);
        const weightInput = document.getElementById(`weight${memberIndex}`);

        ageInput.addEventListener("input", function () {
            const age = parseInt(this.value);
            if (age >= 4) {
                updateRecommendationAndOptions(memberIndex, age);
            } else {
                hideAllGroups(memberIndex);
            }
        });

        levelSelect.addEventListener("change", function () {
            const age = parseInt(ageInput.value);
            const mountType = getMountTypeForMember(memberIndex);
            if (age >= 4 && this.value) {
                updateForfaitOptions(memberIndex, age, this.value, mountType);
            }
        });

        heightInput.addEventListener("input", function () {
            checkMorphologyAndUpdate(memberIndex);
        });

        weightInput.addEventListener("input", function () {
            checkMorphologyAndUpdate(memberIndex);
        });
    }

    function hideAllGroups(memberIndex) {
        document.getElementById(`recommendation${memberIndex}`).style.display =
            "none";
        document.getElementById(`morphologyGroup${memberIndex}`).style.display =
            "none";
        document.getElementById(`mountType${memberIndex}`).style.display =
            "none";
        document.getElementById(`levelGroup${memberIndex}`).style.display =
            "none";
        document.getElementById(`forfaitGroup${memberIndex}`).style.display =
            "none";
        document.getElementById(`repriseGroup${memberIndex}`).style.display =
            "none";

        // Reset des valeurs
        document.getElementById(`height${memberIndex}`).value = "";
        document.getElementById(`weight${memberIndex}`).value = "";
        document.getElementById(`level${memberIndex}`).value = "";
        document.getElementById(`forfait${memberIndex}`).value = "";
        document.getElementById(`reprise${memberIndex}`).value = "";
    }

    function getMountTypeForMember(memberIndex) {
        const age = parseInt(
            document.getElementById(`age${memberIndex}`).value
        );

        if (age >= 10 && age <= 12) {
            const height = parseFloat(
                document.getElementById(`height${memberIndex}`).value
            );
            const weight = parseInt(
                document.getElementById(`weight${memberIndex}`).value
            );

            if (height && weight) {
                const mountInfo = determineMountType(height, weight);
                return mountInfo.type;
            }
        } else if (age >= 7 && age <= 9) {
            return "poney";
        } else if (age >= 13) {
            return "cheval";
        }

        return null;
    }

    function checkMorphologyAndUpdate(memberIndex) {
        const age = parseInt(
            document.getElementById(`age${memberIndex}`).value
        );
        const height = parseFloat(
            document.getElementById(`height${memberIndex}`).value
        );
        const weight = parseInt(
            document.getElementById(`weight${memberIndex}`).value
        );

        if (age >= 10 && age <= 12 && height && weight) {
            const mountInfo = determineMountType(height, weight);
            const mountTypeBox = document.getElementById(
                `mountType${memberIndex}`
            );
            const levelGroup = document.getElementById(
                `levelGroup${memberIndex}`
            );
            const levelSelect = document.getElementById(`level${memberIndex}`);

            mountTypeBox.style.display = "block";
            mountTypeBox.querySelector(".mount-type-text").textContent =
                mountInfo.message;

            if (mountInfo.type === "cheval") {
                levelSelect.innerHTML = `
                    <option value="">🎯 Sélectionner le niveau...</option>
                    <option value="debutant">🌟 Débutant</option>
                    <option value="galop1">1️⃣ Galop 1</option>
                    <option value="galop2">2️⃣ Galop 2</option>
                    <option value="galop3">3️⃣ Galop 3</option>
                    <option value="galop4">4️⃣ Galop 4</option>
                    <option value="galop5">5️⃣ Galop 5</option>
                    <option value="galop6">6️⃣ Galop 6</option>
                    <option value="galop7">7️⃣ Galop 7</option>
                `;
            } else {
                levelSelect.innerHTML = `
                    <option value="">🎯 Sélectionner le niveau...</option>
                    <option value="debutant">🌟 Débutant</option>
                    <option value="bronze">🥉 Galop Bronze</option>
                    <option value="argent">🥈 Galop Argent</option>
                    <option value="or">🥇 Galop Or</option>
                `;
            }

            levelGroup.style.display = "block";
            document.getElementById(
                `forfaitGroup${memberIndex}`
            ).style.display = "none";
            document.getElementById(
                `repriseGroup${memberIndex}`
            ).style.display = "none";

            levelSelect.value = "";
            document.getElementById(`forfait${memberIndex}`).value = "";
            document.getElementById(`reprise${memberIndex}`).value = "";
        }
    }

    function updateRecommendationAndOptions(memberIndex, age) {
        const recommendation = getRecommendation(age);
        const recommendationBox = document.getElementById(
            `recommendation${memberIndex}`
        );
        const morphologyGroup = document.getElementById(
            `morphologyGroup${memberIndex}`
        );
        const mountTypeBox = document.getElementById(`mountType${memberIndex}`);
        const levelGroup = document.getElementById(`levelGroup${memberIndex}`);
        const levelSelect = document.getElementById(`level${memberIndex}`);

        recommendationBox.style.display = "block";
        recommendationBox.querySelector(".recommendation-text").textContent =
            recommendation.message;

        // Reset
        levelSelect.value = "";
        document.getElementById(`forfait${memberIndex}`).value = "";
        document.getElementById(`reprise${memberIndex}`).value = "";
        document.getElementById(`height${memberIndex}`).value = "";
        document.getElementById(`weight${memberIndex}`).value = "";

        morphologyGroup.style.display = "none";
        mountTypeBox.style.display = "none";
        levelGroup.style.display = "none";
        document.getElementById(`forfaitGroup${memberIndex}`).style.display =
            "none";
        document.getElementById(`repriseGroup${memberIndex}`).style.display =
            "none";

        if (recommendation.showMorphology) {
            morphologyGroup.style.display = "block";
        } else if (recommendation.showLevel) {
            if (recommendation.type === "cheval") {
                levelSelect.innerHTML = `
                    <option value="">🎯 Sélectionner le niveau...</option>
                    <option value="debutant">🌟 Débutant</option>
                    <option value="galop1">1️⃣ Galop 1</option>
                    <option value="galop2">2️⃣ Galop 2</option>
                    <option value="galop3">3️⃣ Galop 3</option>
                    <option value="galop4">4️⃣ Galop 4</option>
                    <option value="galop5">5️⃣ Galop 5</option>
                    <option value="galop6">6️⃣ Galop 6</option>
                    <option value="galop7">7️⃣ Galop 7</option>
                `;
            } else {
                levelSelect.innerHTML = `
                    <option value="">🎯 Sélectionner le niveau...</option>
                    <option value="debutant">🌟 Débutant</option>
                    <option value="bronze">🥉 Galop Bronze</option>
                    <option value="argent">🥈 Galop Argent</option>
                    <option value="or">🥇 Galop Or</option>
                `;
            }
            levelGroup.style.display = "block";
        } else {
            updateForfaitOptions(memberIndex, age, "debutant", null);
        }
    }

    function updateForfaitOptions(memberIndex, age, level, mountType) {
        const forfaitCards = document.getElementById(
            `forfaitCards${memberIndex}`
        );
        const forfaitGroup = document.getElementById(
            `forfaitGroup${memberIndex}`
        );
        const forfaitInput = document.getElementById(`forfait${memberIndex}`);

        if (age >= 10 && age <= 12 && !mountType) {
            mountType = getMountTypeForMember(memberIndex);
        }

        const availableForfaits = getAvailableForfaits(age, level, mountType);

        forfaitInput.value = "";
        document.getElementById(`reprise${memberIndex}`).value = "";
        document.getElementById(`repriseGroup${memberIndex}`).style.display =
            "none";

        if (availableForfaits.length === 0) {
            forfaitGroup.style.display = "none";
            return;
        }

        forfaitCards.innerHTML = "";

        availableForfaits.forEach(function (forfaitKey, index) {
            const forfait = forfaitsPricing[forfaitKey];
            const card = document.createElement("div");
            card.className = "forfait-card";
            card.dataset.forfait = forfaitKey;

            if (index === 0) {
                card.classList.add("recommended");
            }

            card.innerHTML = `
                <div class="forfait-icon">${forfait.icon}</div>
                <div class="forfait-name">${forfait.name}</div>
                <div class="forfait-price">${forfait.price}€</div>
                <div class="forfait-description">${forfait.description}</div>
                
            `;

            card.addEventListener("click", function () {
                forfaitCards
                    .querySelectorAll(".forfait-card")
                    .forEach(function (c) {
                        c.classList.remove("selected");
                    });
                this.classList.add("selected");
                forfaitInput.value = forfaitKey;

                // Afficher les reprises après sélection du forfait
                const currentLevel =
                    document.getElementById(`level${memberIndex}`).value ||
                    "debutant";
                console.log(
                    `Forfait selected, showing reprises for level: ${currentLevel}`
                );
                updateRepriseOptions(memberIndex, currentLevel);
            });

            forfaitCards.appendChild(card);
        });

        forfaitGroup.style.display = "block";
    }

    function updateRepriseOptions(memberIndex, level) {
        const repriseCards = document.getElementById(
            `repriseCards${memberIndex}`
        );
        const repriseGroup = document.getElementById(
            `repriseGroup${memberIndex}`
        );
        const repriseInput = document.getElementById(`reprise${memberIndex}`);

        console.log(`Looking for reprises for level: ${level}`);
        console.log("Available levels:", Object.keys(reprisesByLevel));

        if (!reprisesByLevel[level]) {
            console.log(`No reprises found for level: ${level}`);
            repriseGroup.style.display = "none";
            return;
        }

        const availableReprises = reprisesByLevel[level];
        repriseInput.value = "";
        repriseCards.innerHTML = "";

        console.log(
            `Found ${availableReprises.length} reprises for level ${level}`
        );

        availableReprises.forEach(function (reprise, index) {
            const card = document.createElement("div");
            card.className = "reprise-card";
            card.dataset.reprise = reprise.id;

            if (index === 0) {
                card.classList.add("recommended");
            }

            card.innerHTML = `
                <div class="reprise-day">${reprise.day}</div>
                <div class="reprise-time">${reprise.time}</div>
                <div class="reprise-instructor">👨‍🏫 ${reprise.instructor}</div>
                
            `;

            card.addEventListener("click", function () {
                repriseCards
                    .querySelectorAll(".reprise-card")
                    .forEach(function (c) {
                        c.classList.remove("selected");
                    });
                this.classList.add("selected");
                repriseInput.value = reprise.id;
                console.log(`Selected reprise: ${reprise.id}`);
            });

            repriseCards.appendChild(card);
        });

        repriseGroup.style.display = "block";
        console.log("Reprise group should now be visible");
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");

        const calculateBtn = document.getElementById("calculateBtn");
        calculateBtn.classList.add("loading");
        calculateBtn.disabled = true;

        setTimeout(function () {
            calculateTotal();
            calculateBtn.classList.remove("loading");
            calculateBtn.disabled = false;
        }, 1000);
    }

    function calculateTotal() {
        console.log("Starting calculation");
        const memberCount = parseInt(memberCountInput.value);
        let totalPrice = 0;
        let breakdown = [];

        // Collecter toutes les données des membres
        let membersData = [];
        for (let i = 1; i <= memberCount; i++) {
            const age = parseInt(document.getElementById(`age${i}`).value);
            const forfaitKey = document.getElementById(`forfait${i}`).value;
            const repriseId = document.getElementById(`reprise${i}`).value;

            console.log(
                `Member ${i}: age=${age}, forfait=${forfaitKey}, reprise=${repriseId}`
            );

            if (!age || !forfaitKey || !repriseId) {
                showError(
                    `Veuillez remplir tous les champs pour le membre ${i}.`
                );
                return;
            }

            if (age < 4) {
                showError(`L'âge minimum est de 4 ans (Membre ${i}).`);
                return;
            }

            const cotisationBase =
                age < 16 ? fees.cotisation.under16 : fees.cotisation.over16;
            const licence =
                age < 18 ? fees.licence.under18 : fees.licence.over18;
            const forfait = forfaitsPricing[forfaitKey];
            const selectedReprise = findRepriseById(repriseId);

            membersData.push({
                memberIndex: i,
                age: age,
                cotisationBase: cotisationBase,
                licence: licence,
                forfait: forfait.name,
                forfaitPrice: forfait.price,
                reprise: selectedReprise,
            });
        }

        // Appliquer les remises famille nombreuse sur les cotisations
        const membersWithDiscounts = applyFamilyDiscounts(membersData);

        // Calculer les totaux finaux
        membersWithDiscounts.forEach(function (member) {
            const memberTotal =
                member.cotisation + member.licence + member.forfaitPrice;
            member.total = memberTotal;
            totalPrice += memberTotal;
            breakdown.push(member);
        });

        console.log("Calculation complete, showing result");
        showDetailedResult(totalPrice, breakdown, memberCount);
    }

    function applyFamilyDiscounts(membersData) {
        const memberCount = membersData.length;

        // Si moins de 3 membres, pas de remise
        if (memberCount < 3) {
            membersData.forEach(function (member) {
                member.cotisation = member.cotisationBase;
                member.cotisationDiscount = 0;
                member.cotisationOriginal = member.cotisationBase;
            });
            return membersData;
        }

        // Créer une copie avec index original pour trier par cotisation décroissante
        let sortedMembers = membersData
            .map(function (member, index) {
                return {
                    ...member,
                    originalIndex: index,
                };
            })
            .sort(function (a, b) {
                return b.cotisationBase - a.cotisationBase; // Décroissant
            });

        // Appliquer les remises selon l'ordre décroissant
        sortedMembers.forEach(function (member, sortedIndex) {
            member.cotisationOriginal = member.cotisationBase;

            if (sortedIndex === 2) {
                // 3ème membre (index 2)
                member.cotisationDiscount = 0.5; // 50% de réduction
                member.cotisation = member.cotisationBase * 0.5;
            } else if (sortedIndex >= 3) {
                // 4ème membre et suivants
                member.cotisationDiscount = 0.75; // 75% de réduction
                member.cotisation = member.cotisationBase * 0.25;
            } else {
                member.cotisationDiscount = 0; // Pas de remise
                member.cotisation = member.cotisationBase;
            }
        });

        // Remettre dans l'ordre original
        let result = new Array(memberCount);
        sortedMembers.forEach(function (member) {
            result[member.originalIndex] = member;
        });

        console.log("Discounts applied:", result);
        return result;
    }

    function showDetailedResult(totalPrice, breakdown, memberCount) {
        // Remplacer complètement le contenu du container
        resultContainer.innerHTML = `
            <div class="result-price" id="resultPrice">${totalPrice.toFixed(
                2
            )}€</div>
            <div class="result-details" id="resultDetails">
                <div class="result-header">
                    <h3>📋 Récapitulatif détaillé</h3>
                    <p>Pour ${memberCount} membre${
            memberCount > 1 ? "s" : ""
        }</p>
                </div>
                <div class="members-breakdown">
                    ${breakdown
                        .map(function (member) {
                            return `
                            <div class="member-breakdown">
                                <div class="member-header">
                                    <span class="member-info">👤 Membre ${
                                        member.memberIndex
                                    } (${member.age} ans)</span>
                                    <span class="member-total">${
                                        member.total
                                    }€</span>
                                </div>
                                <div class="breakdown-details">
                                    <div class="breakdown-line ${
                                        member.cotisationDiscount > 0
                                            ? "discount-line"
                                            : ""
                                    }">
                                        <span class="breakdown-label">💳 Cotisation${
                                            member.cotisationDiscount > 0
                                                ? ` (-${(
                                                      member.cotisationDiscount *
                                                      100
                                                  ).toFixed(0)}%)`
                                                : ""
                                        }</span>
                                        <span class="breakdown-value">
                                            ${
                                                member.cotisationDiscount > 0
                                                    ? `<span class="original-price">${member.cotisationOriginal}€</span> `
                                                    : ""
                                            }
                                            ${member.cotisation}€
                                        </span>
                                    </div>
                                    <div class="breakdown-line">
                                        <span class="breakdown-label">🏅 Licence fédérale</span>
                                        <span class="breakdown-value">${
                                            member.licence
                                        }€</span>
                                    </div>
                                    <div class="breakdown-line forfait-line">
                                        <span class="breakdown-label">🏇 ${
                                            member.forfait
                                        }</span>
                                        <span class="breakdown-value">${
                                            member.forfaitPrice
                                        }€</span>
                                    </div>
                                    ${
                                        member.reprise
                                            ? `
                                    <div class="breakdown-line reprise-line">
                                        <span class="breakdown-label">🕐 ${member.reprise.day} ${member.reprise.time}</span>
                                        <span class="breakdown-instructor">avec ${member.reprise.instructor}</span>
                                    </div>
                                    `
                                            : ""
                                    }
                                </div>
                            </div>
                        `;
                        })
                        .join("")}
                </div>
                <div class="total-section">
                    <div class="total-line">
                        <span class="total-label">💰 Total général</span>
                        <span class="total-amount">${totalPrice.toFixed(
                            2
                        )}€</span>
                    </div>
                </div>
            </div>
        `;

        resultContainer.style.display = "block";
        resultContainer.style.opacity = "0";
        resultContainer.style.transform = "translateY(20px)";

        setTimeout(function () {
            resultContainer.style.transition = "all 0.5s ease";
            resultContainer.style.opacity = "1";
            resultContainer.style.transform = "translateY(0)";

            // Animation du prix total
            const newResultPrice = document.getElementById("resultPrice");
            animatePrice(totalPrice, newResultPrice);

            resultContainer.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }, 100);
    }

    function showResult(totalPrice, breakdown, memberCount) {
        resultContainer.style.display = "block";
        resultContainer.style.opacity = "0";
        resultContainer.style.transform = "translateY(20px)";

        setTimeout(function () {
            resultContainer.style.transition = "all 0.5s ease";
            resultContainer.style.opacity = "1";
            resultContainer.style.transform = "translateY(0)";

            animatePrice(totalPrice);

            let detailsText = `Détail pour ${memberCount} membre${
                memberCount > 1 ? "s" : ""
            } :\n\n`;

            breakdown.forEach(function (member) {
                detailsText += `👤 Membre ${member.memberIndex} (${member.age} ans) :\n`;
                detailsText += `• Cotisation : ${member.cotisation}€\n`;
                detailsText += `• Licence fédérale : ${member.licence}€\n`;
                detailsText += `• Forfait ${member.forfait} : ${member.forfaitPrice}€\n`;
                detailsText += `= Total : ${member.total}€\n\n`;
            });

            resultDetails.textContent = detailsText;
            resultContainer.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }, 100);
    }

    function createDetailedResult(breakdown, memberCount, detailsElement) {
        let resultHTML = `
            <div class="result-header">
                <h3>📋 Récapitulatif détaillé</h3>
                <p>Pour ${memberCount} membre${memberCount > 1 ? "s" : ""}</p>
            </div>
            <div class="members-breakdown">
        `;

        breakdown.forEach(function (member) {
            resultHTML += `
                <div class="member-breakdown">
                    <div class="member-header">
                        <span class="member-info">👤 Membre ${member.memberIndex} (${member.age} ans)</span>
                        <span class="member-total">${member.total}€</span>
                    </div>
                    <div class="breakdown-details">
                        <div class="breakdown-line">
                            <span class="breakdown-label">💳 Cotisation</span>
                            <span class="breakdown-value">${member.cotisation}€</span>
                        </div>
                        <div class="breakdown-line">
                            <span class="breakdown-label">🏅 Licence fédérale</span>
                            <span class="breakdown-value">${member.licence}€</span>
                        </div>
                        <div class="breakdown-line forfait-line">
                            <span class="breakdown-label">🏇 ${member.forfait}</span>
                            <span class="breakdown-value">${member.forfaitPrice}€</span>
                        </div>`;

            if (member.reprise) {
                resultHTML += `
                        <div class="breakdown-line reprise-line">
                            <span class="breakdown-label">🕐 ${member.reprise.day} ${member.reprise.time}</span>
                            <span class="breakdown-instructor">avec ${member.reprise.instructor}</span>
                        </div>`;
            }

            resultHTML += `
                    </div>
                </div>
            `;
        });

        resultHTML += `
            </div>
        `;

        detailsElement.innerHTML = resultHTML;
    }

    function animatePrice(finalPrice, priceElement) {
        let currentPrice = 0;
        const increment = finalPrice / 30;

        const animation = setInterval(function () {
            currentPrice += increment;
            if (currentPrice >= finalPrice) {
                currentPrice = finalPrice;
                clearInterval(animation);
            }
            priceElement.textContent = currentPrice.toFixed(2) + "€";
        }, 30);
    }

    function showError(message) {
        const errorDiv = document.createElement("div");
        errorDiv.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: #f44336;
            color: white; padding: 15px 20px; border-radius: 8px;
            box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3); z-index: 10000;
            font-weight: 500; transform: translateX(300px); transition: transform 0.3s ease;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        setTimeout(function () {
            errorDiv.style.transform = "translateX(0)";
        }, 100);
        setTimeout(function () {
            errorDiv.style.transform = "translateX(300px)";
            setTimeout(function () {
                document.body.removeChild(errorDiv);
            }, 300);
        }, 3000);
    }

    function findRepriseById(repriseId) {
        for (let level in reprisesByLevel) {
            const reprise = reprisesByLevel[level].find(
                (r) => r.id === repriseId
            );
            if (reprise) return reprise;
        }
        return null;
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && popup.style.display === "block") {
            closePopup();
        }
    });

    generateMemberForms();
}

// Initialisation quand le DOM est chargé
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSimulator);
} else {
    initSimulator();
}
