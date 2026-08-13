/* ==========================================================
   intension.js — Logique de l'écran "Intension"
   Choix du diocèse puis de la paroisse
   ========================================================== */

// ---- Données (à remplacer plus tard par un appel API) ----
const DIOCESES = [
  { id: "grand-bassam", label: "Grand-Bassam" },
  { id: "abidjan", label: "Abidjan" },
];

// ⚠️ Champ "detailLink" : lien propre à chaque paroisse.
// Laisse-le vide ("") pour l'instant si tu veux garder le comportement
// par défaut (formulaire de demande classique), ou remplis-le plus tard
// avec l'URL de la page de détail spécifique à cette paroisse.
const PARISHES = {
  "grand-bassam": [
    { id: 1, name: "Notre Dame de l'Assomption", location: "Koumassi-Prodomo", detailLink: "DiocGrandBass/intension-nda/intension-nda.html" },
    { id: 2, name: "Notre Dame de l'Assomption", location: "Koumassi-Prodomo", detailLink: "" },
    { id: 3, name: "Notre Dame de l'Assomption", location: "Koumassi-Prodomo", detailLink: "" },
    { id: 4, name: "Notre Dame de l'Assomption", location: "Koumassi-Prodomo", detailLink: "" },
  ],
  abidjan: [
    { id: 5, name: "Cathédrale Saint-Paul", location: "Le Plateau", detailLink: "" },
    { id: 6, name: "Sainte Thérèse", location: "Cocody", detailLink: "DiocGrandBass/intension-nda/intension-nda.html" },
  ],
};

// ---- État de la sélection ----
const state = {
  selectedDiocese: "grand-bassam",
  selectedParish: null,
};

// ---- Références DOM ----
const dioceseListEl = document.getElementById("dioceseList");
const parishListEl = document.getElementById("parishList");
const btnBack = document.getElementById("btnBack");

// ---- Rendu des diocèses ----
function renderDioceses() {
  dioceseListEl.innerHTML = "";

  DIOCESES.forEach((diocese) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip-diocese";
    chip.textContent = diocese.label;
    chip.dataset.id = diocese.id;

    if (diocese.id === state.selectedDiocese) {
      chip.classList.add("is-selected");
    }

    chip.addEventListener("click", () => {
      state.selectedDiocese = diocese.id;
      state.selectedParish = null;
      renderDioceses();
      renderParishes();
    });

    dioceseListEl.appendChild(chip);
  });
}

// ---- Rendu des paroisses en fonction du diocèse choisi ----
function renderParishes() {
  parishListEl.innerHTML = "";

  const parishes = PARISHES[state.selectedDiocese] || [];

  parishes.forEach((parish) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card-parish";
    if (parish.id === state.selectedParish) {
      card.classList.add("is-selected");
    }

    card.innerHTML = `
      <div class="parish-name">${parish.name}</div>
      <div class="parish-location">${parish.location}</div>
    `;

    card.addEventListener("click", () => {
      state.selectedParish = parish.id;
      renderParishes();

      // On mémorise la paroisse choisie
      localStorage.setItem("selectedParish", JSON.stringify(parish));
 
      // Si un lien spécifique a été défini pour cette paroisse (champ
      // "detailLink" ci-dessus), on l'utilise. Sinon, on garde le
      // comportement par défaut vers le formulaire de demande classique.

      const destination = parish.detailLink && parish.detailLink.trim() !== ""
        ? parish.detailLink
        : "intension-details.html";
 
      window.location.href = destination;
    });
 
    parishListEl.appendChild(card);
  });
}

// ---- Navigation ----
btnBack.addEventListener("click", () => {
  window.location.href = "../index.html";
});

// ---- Popup d'alerte (délai avant la messe) ----
const delayNoticeModal = document.getElementById("delayNoticeModal");
const btnDelayNoticeOk = document.getElementById("btnDelayNoticeOk");
 
btnDelayNoticeOk.addEventListener("click", () => {
  delayNoticeModal.hidden = true;
});

// ---- Initialisation ----
document.addEventListener("DOMContentLoaded", () => {
  renderDioceses();
  renderParishes();
  
    // Le popup s'affiche à chaque arrivée sur la page
  delayNoticeModal.hidden = false;

});