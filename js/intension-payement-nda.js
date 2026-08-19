/* ==========================================================
   intension-payment.js — Page de paiement Wave
   - Clic sur l'image QR : ouvre Wave (nouvel onglet), puis
     redirige vers la page succès dès que l'utilisateur revient
     sur cet onglet
   - Bouton "OU SCAN ET CLICK ICI" : redirige directement vers
     la page succès (utilisé après un scan manuel avec l'appli Wave)
   - Les demandes sont enregistrées dans Firestore, collection "intensions"
 
   ⚠️ À COMPLÉTER TOI-MÊME :
   - WAVE_PAYMENT_LINK : ton lien de paiement Wave
   - assets/wave-qr-placeholder.png : remplace par l'image réelle
     de ton QR code Wave (le visuel "Pay with Wave" complet)
 
   ⚠️ Comme convenu, ce système ne vérifie pas réellement que le
   paiement a été effectué : il fait confiance à l'utilisateur.
   ========================================================== */

//  Remplace cette valeur par TON vrai lien de paiement Wave
const WAVE_PAYMENT_LINK = "https://pay.wave.com/m/M_ci_Km3iUoVU8nNA/c/ci/?amount=30";

document.addEventListener("DOMContentLoaded", () => {
  // ---- Références DOM ----
  const btnQrPay = document.getElementById("btnQrPay");
  const btnScanDone = document.getElementById("btnScanDone");
 
  // ---- Récupération des données de la demande ----
  const formData = JSON.parse(localStorage.getItem("intensionForm") || "null");
 
  let docId = null;
  let pendingDocPromise = null; // verrou : une seule création de document à la fois
  let isRedirecting = false; // verrou : une seule redirection vers "success"
  let waveClicked = false; // vrai dès que l'utilisateur a cliqué sur l'image QR
 
  /* =========================================================
     Enregistrement / récupération de la demande dans Firestore
     ========================================================= */
  function saveOrGetPendingDoc() {
    if (docId) return Promise.resolve(docId);
 
    // Si une création est déjà en cours (ex: deux événements déclenchés
    // presque en même temps), on réutilise la MÊME promesse au lieu
    // d'en relancer une deuxième -> évite le document en double.
    if (pendingDocPromise) return pendingDocPromise;
    
 
    pendingDocPromise = (async () => {
      try {
        const docRef = await db.collection("intentions-nda").add({
          parish: formData?.parish || null,
          demande: formData?.demande || "",
          jour: formData?.jour || "",
          heure: formData?.heure || "",
          numero: formData?.numero || "",
          paymentProvider: "wave",
          status: "pending",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        docId = docRef.id;
        localStorage.setItem("intensionDocId", docId);
        return docId;
      } catch (error) {
        console.error("Erreur Firestore :", error);
        pendingDocPromise = null; // on autorise un nouvel essai si ça a échoué
        return null;
      }
    })();
 
    return pendingDocPromise;
  }
 
  async function markAsPaidAndGoToSuccess() {
    // Empêche un double déclenchement (ex: "focus" ET "visibilitychange"
    // qui se déclenchent tous les deux au retour sur l'onglet)
    if (isRedirecting) return;
    isRedirecting = true;
 
    const id = await saveOrGetPendingDoc();
 
    if (id) {
      try {
        await db.collection("intentions-nda").doc(id).update({
          status: "paid",
          paidAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } catch (error) {
        console.error("Erreur mise à jour Firestore :", error);
      }
    }
 
    // Cette demande est terminée : on efface son identifiant pour que
    // la PROCHAINE demande (même appareil) crée bien un nouveau document
    localStorage.removeItem("intensionDocId");
 
    window.location.href = "../../intension-success.html";
  }
 
  // On enregistre la demande dès l'arrivée sur cette page (statut "pending")
  saveOrGetPendingDoc();

 
  /* =========================================================
     1) CLIC SUR L'IMAGE QR : ouvre Wave, puis on attend que
     l'utilisateur revienne sur cet onglet pour aller sur "success"
     ========================================================= */
  btnQrPay.addEventListener("click", () => {
    waveClicked = true;
    window.open(WAVE_PAYMENT_LINK, "_blank");
  });
 
  // Détecte le retour de l'utilisateur sur cet onglet
  // (après avoir payé dans l'app Wave ou le nouvel onglet ouvert)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && waveClicked) {
      waveClicked = false; // évite un déclenchement multiple
      markAsPaidAndGoToSuccess();
    }
  });
 
  // Filet de sécurité pour les navigateurs qui déclenchent "focus"
  // plutôt que "visibilitychange" au retour sur l'onglet
  window.addEventListener("focus", () => {
    if (waveClicked) {
      waveClicked = false;
      markAsPaidAndGoToSuccess();
    }
  });
 
  /* =========================================================
     2) BOUTON "OU SCAN ET CLICK ICI" : va directement sur "success"
     ========================================================= */
  btnScanDone.addEventListener("click", () => {
    markAsPaidAndGoToSuccess();
  });
});
 