document.addEventListener("DOMContentLoaded", () => {
  const btnIntension = document.getElementById("btnIntension");
  const btnDonation = document.getElementById("btnDonation");
 
  // Redirection vers la page "Intension"
  btnIntension.addEventListener("click", () => {
    window.location.href = "intensions/intension.html";
  });
 
  // Redirection vers la page "Donation"
  btnDonation.addEventListener("click", () => {
    window.location.href = "donations/donations-construction/donation-construction.html";
  });
 
  // Enregistrement du Service Worker (PWA)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => console.log("Service Worker enregistré :", reg.scope))
        .catch((err) =>
          console.warn("Échec de l'enregistrement du Service Worker :", err)
        );
    });
  }
});
 