/* ==========================================================
   donation-orphelinat.js — Écran "DONATION" > Orphelinats
   Fichier 100% autonome : données + affichage de la liste.
   La photo de chaque projet est FIXE : ce n'est pas
   l'utilisateur de l'app qui la choisit, seul le code
   source la définit (champ "photo" ci-dessous).
   ========================================================== */

// ---- Données des orphelinats ----
// ⚠️ C'est ICI que tu modifies toi-même, pour chaque projet :
// - photo : chemin vers la vraie photo (remplace le placeholder)
const ORPHELINAT_PROJECTS = [
  {
    id: "poupouniere-adiake",
    title: "POUPOUNIERE LES ANGES D'ADIAKE",
    location: "Adiake",
    description:
      "Cette institution acceuille et prend en charge les enfants de -5 ans orphelins et abandonnes dans un environnement empreint de soin et d'amour",
    photo: "../assets/donations/placeholder.png",
  },
];

// ---- Références DOM ----
const donationListEl = document.getElementById("donationList");
const btnBack = document.getElementById("btnBack");

// ---- Rendu de la liste ----
function renderProjects() {
  donationListEl.innerHTML = "";

  if (ORPHELINAT_PROJECTS.length === 0) {
    donationListEl.innerHTML = `<p class="empty-state">Aucun projet pour le moment.</p>`;
    return;
  }

  ORPHELINAT_PROJECTS.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.id = project.id;

    card.innerHTML = `
      <div class="project-photo">
        <img src="${project.photo}" alt="${project.title}" />
      </div>
      <div class="project-info">
        <h2 class="project-title">${project.title}${
          project.location ? ` (${project.location})` : ""
        }</h2>
        <p class="project-description">${project.description}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `poupouniere-les-anges-adiake.html?id=${project.id}`;
    });

    donationListEl.appendChild(card);
  });
}

// ---- Navigation retour ----
btnBack.addEventListener("click", () => {
  window.location.href = "../../index.html";
});

// ---- Initialisation ----
document.addEventListener("DOMContentLoaded", renderProjects);