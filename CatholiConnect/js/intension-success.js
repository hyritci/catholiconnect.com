/* ==========================================================
   intension-success.js — Confirmation d'envoi de la demande
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const btnHome = document.getElementById("btnHome");

  btnHome.addEventListener("click", () => {
    // On nettoie les données temporaires du parcours Intension
    localStorage.removeItem("intensionForm");
    localStorage.removeItem("intensionFormDraft");
    localStorage.removeItem("intensionPayment");
    localStorage.removeItem("selectedParish");

    window.location.href = "../index.html";
  });
});