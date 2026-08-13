/* ==========================================================
   donation-construction.js — Écran "DONATION" > Constructions
   Fichier 100% autonome : données + affichage de la liste.
   La photo de chaque projet est FIXE : ce n'est pas
   l'utilisateur de l'app qui la choisit, seul le code
   source la définit (champ "photo" ci-dessous).
   ========================================================== */

// ---- Données des projets de construction ----
// ⚠️ C'est ICI que tu modifies toi-même, pour chaque projet :
// - photo : chemin vers la vraie photo (remplace le placeholder)
const CONSTRUCTION_PROJECTS = [
  {
    id: "cathedrale-1",
    title: "CATHEDRALE SAINT ESPRIT",
    location: "Grand-Bassam",
    description:
      "Premiere Cathedrale du Diocese de Grand Bassam, sur 17ha, l'ouvrage est estimé à environ 7 milliards de FCFA",
    photo: "../assets/donations/placeholder.png",
  },
  {
    id: "cathedrale-2",
    title: "CATHEDRALE SAINT ESPRIT",
    location: "Grand-Bassam",
    description:
      "Premiere Cathedrale du Diocese de Grand Bassam, sur 17ha, l'ouvrage est estimé à environ 7 milliards de FCFA",
    photo: "../assets/donations/placeholder.png",
  },
  {
    id: "cathedrale-3",
    title: "CATHEDRALE SAINT ESPRIT",
    location: "Grand-Bassam",
    description:
      "Premiere Cathedrale du Diocese de Grand Bassam, sur 17ha, l'ouvrage est estimé à environ 7 milliards de FCFA",
    photo: "../assets/donations/placeholder.png",
  },
  {
    id: "cathedrale-4",
    title: "CATHEDRALE SAINT ESPRIT",
    location: "Grand-Bassam",
    description:
      "Premiere Cathedrale du Diocese de Grand Bassam, sur 17ha, l'ouvrage est estimé à environ 7 milliards de FCFA",
    photo: "../assets/donations/placeholder.png",
  },
];

// ---- Références DOM ----
const donationListEl = document.getElementById("donationList");
const btnBack = document.getElementById("btnBack");

// ---- Rendu de la liste ----
function renderProjects() {
  donationListEl.innerHTML = "";

  if (CONSTRUCTION_PROJECTS.length === 0) {
    donationListEl.innerHTML = `<p class="empty-state">Aucun projet pour le moment.</p>`;
    return;
  }

  CONSTRUCTION_PROJECTS.forEach((project) => {
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
      window.location.href = `cathedrale-saint-esprit.html?id=${project.id}`;
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