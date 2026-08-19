/* ==========================================================
   donation-orphelinat-detail.js — Détail d'un orphelinat.
   Fichier 100% autonome : données + logique.

   ⚠️ C'est ICI que tu modifies toi-même, pour chaque projet :
   - photo    : chemin vers la vraie photo (remplace le placeholder)
   - whatsapp : numéro WhatsApp SANS le "+" (ex: "2250700000000")
   - phone    : numéro de téléphone au format international (ex: "+2250700000000")
   - mapsLink : lien Google Maps du lieu (adresse ou coordonnées GPS)
   ========================================================== */

const ORPHELINAT_DETAILS = [
  {
    id: "poupouniere-adiake",
    title: "POUPOUNIERE LES ANGES D'ADIAKE",
    location: "Adiake",
    description:
      "Cette institution acceuille et prend en charge les enfants de -5 ans orphelins et abandonnes dans un environnement empreint de soin et d'amour",
    photo: "../assets/donations/placeholder.png",
    whatsapp: "2250700000000",
    phone: "+2250700000000",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Poupouniere+Les+Anges+d%27Adiake",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // ---- Références DOM ----
  const btnBack = document.getElementById("btnBack");

  const projectPhoto = document.getElementById("projectPhoto");
  const projectTitle = document.getElementById("projectTitle");

  const linkWhatsapp = document.getElementById("linkWhatsapp");
  const linkPhone = document.getElementById("linkPhone");
  const linkLocation = document.getElementById("linkLocation");

  // ---- Lecture du paramètre d'URL (?id=...) ----
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  // ---- Récupération du projet correspondant ----
  const project =
    ORPHELINAT_DETAILS.find((p) => p.id === projectId) || ORPHELINAT_DETAILS[0];

  // ---- Remplissage des informations du projet ----
  if (project) {
    projectPhoto.src = project.photo;
    projectPhoto.alt = project.title;

    projectTitle.innerHTML = project.location
      ? `${project.title}<br />(${project.location})`
      : project.title;


    // Lien WhatsApp : ouvre directement une conversation avec le numéro défini
    linkWhatsapp.href = `https://wa.me/${project.whatsapp}`;

    // Lien téléphone : ouvre l'appel natif du téléphone avec le numéro défini
    linkPhone.href = `tel:${project.phone}`;

    // Lien localisation : ouvre directement la carte (Google Maps)
    linkLocation.href = project.mapsLink;
  }

  // ---- Navigation retour ----
  btnBack.addEventListener("click", () => {
    window.location.href = "donation-orphelinat.html";
  });
});