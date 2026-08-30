/* ==========================================================
   intension-exemples.js — Liste de modèles d'intentions,
   copiables en un clic (presse-papier)
   ========================================================== */

// ---- Données des exemples (à enrichir librement) ----
const EXEMPLES = [
  {
    id: "pardon-peches",
    title: "Pardon des peches",
text: "[nom], demande pardon au Seigneur pour [ses, son] péchés [de...]. Qu'il lui accorde sa miséricorde par l'interception de la viergeb Marie.",
  },
  {
    id: "action-grace",
    title: "Action de grace",
    text: "[nom], rends grâce au Seigneur pour tous ses bienfaits reçus. Lui confie sa vie et celle de mes proches par l'interception de la vierge Marie.",
  },
  {
    id: "guerison",
    title: "Guerison",
    text: "[nom], confie [la, sa] santé [de mon proche malade]. Qu'il lui accorde la guérison et donne-lui la force de traverser cette épreuve par l'interception de la vierge Marie.",
  },
  {
    id: "defunts",
    title: "Repos d'un defunt",
    text: "Seigneur, accueille dans ta lumière l'âme de notre défunt. Accorde-lui le repos éternel et console sa famille dans cette épreuve.",
  },
];

// ---- Références DOM ----
const exemplesListEl = document.getElementById("exemplesList");
const btnBack = document.getElementById("btnBack");

// ---- Rendu de la liste ----
function renderExemples() {
  exemplesListEl.innerHTML = "";

  EXEMPLES.forEach((exemple) => {
    const card = document.createElement("div");
    card.className = "exemple-card";

    card.innerHTML = `
      <div class="exemple-header">
        <span class="exemple-title">${exemple.title}</span>
        <button class="btn-copier" type="button" data-id="${exemple.id}">COPIER</button>
      </div>
      <p class="exemple-text">${exemple.text}</p>
    `;

    exemplesListEl.appendChild(card);
  });

  // Un seul écouteur par bouton, ajouté après insertion dans le DOM
  exemplesListEl.querySelectorAll(".btn-copier").forEach((btn) => {
    btn.addEventListener("click", () => handleCopy(btn));
  });
}

// ---- Copie du texte dans le presse-papier ----
async function handleCopy(btn) {
  const exemple = EXEMPLES.find((e) => e.id === btn.dataset.id);
  if (!exemple) return;

  try {
    await navigator.clipboard.writeText(exemple.text);
  } catch (err) {
    // Solution de secours si l'API Clipboard n'est pas disponible
    console.warn("Clipboard API indisponible, fallback :", err);
  }

  // On garde aussi une trace pour un éventuel collage automatique
  localStorage.setItem("copiedExempleText", exemple.text);

  // Retour visuel temporaire
  const originalLabel = btn.textContent;
  btn.textContent = "COPIÉ ✓";
  btn.classList.add("is-copied");

  setTimeout(() => {
    btn.textContent = originalLabel;
    btn.classList.remove("is-copied");
  }, 1500);
}

// ---- Navigation retour ----
btnBack.addEventListener("click", () => {
  window.history.back();
});

// ---- Initialisation ----
document.addEventListener("DOMContentLoaded", renderExemples);