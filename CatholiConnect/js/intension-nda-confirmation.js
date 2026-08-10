/* ==========================================================
   intension-confirmation.js — Étape 3 de "Intension"
   - Affiche le résumé de la demande
   - Popup d'avertissement au chargement (paiement obligatoire)
   - Déverrouille le bouton "wave" après confirmation de lecture
   - Le bouton "orange" reste indisponible (désactivé en dur)
   - Enregistre la demande dans Firestore puis redirige vers
     le lien de paiement Wave
   ========================================================== */


document.addEventListener("DOMContentLoaded", () => {
  // ---- Références DOM ----
  const btnBack = document.getElementById("btnBack");

  const fieldIntension = document.getElementById("fieldIntension");
  const fieldJour = document.getElementById("fieldJour");
  const fieldHeure = document.getElementById("fieldHeure");
  const fieldNumero = document.getElementById("fieldNumero");

  const checkLu = document.getElementById("checkLu");
  const btnWave = document.getElementById("btnPayement");

  const paymentNoticeModal = document.getElementById("paymentNoticeModal");
  const btnNoticeOk = document.getElementById("btnNoticeOk");

  // ---- Récupération des données saisies à l'étape précédente ----
  const formData = JSON.parse(localStorage.getItem("intensionForm") || "null");

  if (formData) {
    fieldIntension.textContent = formData.demande || "LE TEXTE SERA INSCRIT ICI";
    fieldJour.textContent = (formData.jour || "LUNDI").toUpperCase();
    fieldHeure.textContent = (formData.heure || "06H").toUpperCase();
    fieldNumero.textContent = formData.numero || "07 07 07 01 07";
  }

  /* =========================================================
     1) POPUP D'AVERTISSEMENT (affichée dès l'arrivée sur la page)
     ========================================================= */
  paymentNoticeModal.hidden = false;

  btnNoticeOk.addEventListener("click", () => {
    paymentNoticeModal.hidden = true;
  });

  // ---- Navigation retour ----
  btnBack.addEventListener("click", () => {
    window.location.href = "intension-nda.html";
  });

  /* =========================================================
 2) DÉVERROUILLAGE DU BOUTON "PAYEMENT"
     ========================================================= */
  checkLu.addEventListener("change", () => {
    btnPayement.disabled = !checkLu.checked;
  });

  /* =========================================================
     3) CLIC SUR "PAYEMENT" -> PAGE DE PAIEMENT WAVE (QR / lien)
     ========================================================= */
  btnPayement.addEventListener("click", () => {
    window.location.href = "intension-payment-nda.html";
  });
});