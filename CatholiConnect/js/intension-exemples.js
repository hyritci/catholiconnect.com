/* ==========================================================
   intension-exemples.js — Liste de modèles d'intentions,
   copiables en un clic (presse-papier)
   ========================================================== */

// ---- Données des exemples (à enrichir librement) ----
const EXEMPLES = [
  {
    id: "pardon-peches",
    title: "Pardon des peches",
    text: "Seigneur, je te confie mes fautes et je te demande pardon pour mes péchés. Accorde-moi ta miséricorde et aide-moi à cheminer vers Toi.",
  },
  {
    id: "action-grace",
    title: "Action de grace",
    text: "Seigneur, je te rends grâce pour tous les bienfaits reçus. Merci pour ta présence et ton amour dans ma vie et celle de mes proches.",
  },
  {
    id: "guerison",
    title: "Guerison d'un proche",
    text: "Seigneur, je te confie la santé de mon proche malade. Accorde-lui la guérison et donne-lui la force de traverser cette épreuve.",
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