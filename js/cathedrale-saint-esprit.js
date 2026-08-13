/* ==========================================================
   donation-construction-detail.js — Détail d'un projet
   de construction. Fichier 100% autonome : données + logique.

   ⚠️ C'est ICI que tu modifies toi-même, pour chaque projet :
   - photo    : chemin vers la vraie photo (remplace le placeholder)
   - whatsapp : numéro WhatsApp SANS le "+" (ex: "2250700000000")
   - phone    : numéro de téléphone au format international (ex: "+2250700000000")
   - mapsLink : lien Google Maps du lieu (adresse ou coordonnées GPS)
   ========================================================== */

const CONSTRUCTION_DETAILS = [
  {
    id: "cathedrale-1",
    title: "CATHEDRALE SAINT SPRIT",
    location: "Grand-Bassam",
    description:
      "Vous pouvez choisir d'effectuer vos donations a distance en contactant directement l'institut au travers des moyens de communocations ci-dessous pour en savoir plus sur les mode de payement",
    photo: "../assets/donations/placeholder.png",
    whatsapp: "2250700000000",
    phone: "+2250700000000",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Cathedrale+Saint+Esprit+Grand-Bassam",
  },
  {
    id: "cathedrale-2",
    title: "CATHEDRALE SAINT SPRIT",
    location: "Grand-Bassam",
    description:
      "Vous pouvez choisir d'effectuer vos donations a distance en contactant directement l'institut au travers des moyens de communocations ci-dessous pour en savoir plus sur les mode de payement",
    photo: "../assets/donations/placeholder.png",
    whatsapp: "2250700000000",
    phone: "+2250700000000",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Cathedrale+Saint+Esprit+Grand-Bassam",
  },
  {
    id: "cathedrale-3",
    title: "CATHEDRALE SAINT SPRIT",
    location: "Grand-Bassam",
    description:
      "Vous pouvez choisir d'effectuer vos donations a distance en contactant directement l'institut au travers des moyens de communocations ci-dessous pour en savoir plus sur les mode de payement",
    photo: "../assets/donations/placeholder.png",
    whatsapp: "2250700000000",
    phone: "+2250700000000",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Cathedrale+Saint+Esprit+Grand-Bassam",
  },
  {
    id: "cathedrale-4",
    title: "CATHEDRALE SAINT SPRIT",
    location: "Grand-Bassam",
    description:
      "Vous pouvez choisir d'effectuer vos donations a distance en contactant directement l'institut au travers des moyens de communocations ci-dessous pour en savoir plus sur les mode de payement",
    photo: "../assets/donations/placeholder.png",
    whatsapp: "2250700000000",
    phone: "+2250700000000",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Cathedrale+Saint+Esprit+Grand-Bassam",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // ---- Références DOM ----
  const btnBack = document.getElementById("btnBack");

  const projectPhoto = document.getElementById("projectPhoto");
  const projectTitle = document.getElementById("projectTitle");
  const projectDescription = document.getElementById("projectDescription");

  const linkWhatsapp = document.getElementById("linkWhatsapp");
  const linkPhone = document.getElementById("linkPhone");
  const linkLocation = document.getElementById("linkLocation");

  // ---- Lecture du paramètre d'URL (?id=...) ----
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  // ---- Récupération du projet correspondant ----
  const project =
    CONSTRUCTION_DETAILS.find((p) => p.id === projectId) || CONSTRUCTION_DETAILS[0];

  // ---- Remplissage des informations du projet ----
  if (project) {
    projectPhoto.src = project.photo;
    projectPhoto.alt = project.title;

    projectTitle.innerHTML = project.location
      ? `${project.title}<br />(${project.location})`
      : project.title;

    projectDescription.textContent = project.description;

    // Lien WhatsApp : ouvre directement une conversation avec le numéro défini
    linkWhatsapp.href = `https://wa.me/${project.whatsapp}`;

    // Lien téléphone : ouvre l'appel natif du téléphone avec le numéro défini
    linkPhone.href = `tel:${project.phone}`;

    // Lien localisation : ouvre directement la carte (Google Maps)
    linkLocation.href = project.mapsLink;
  }

  // ---- Navigation retour ----
  btnBack.addEventListener("click", () => {
    window.location.href = "donation-construction.html";
  });
});