/* ==========================================================
   intension-payment.js — Page de paiement Wave
   - Clic sur l'image QR : ouvre Wave (nouvel onglet), puis
     redirige vers la page succès dès que l'utilisateur revient
     sur cet onglet
   - Bouton "OU SCAN ET CLICK ICI" : redirige directement vers
     la page succès (utilisé après un scan manuel avec l'appli Wave)

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

  let docId = localStorage.getItem("intensionDocId");
  let waveClicked = false; // vrai dès que l'utilisateur a cliqué sur l'image QR

  /* =========================================================
     Enregistrement / récupération de la demande dans Supabase
     (table "intensions")
     ========================================================= */
  async function saveOrGetPendingDoc() {
    if (docId) return docId;
 
    try {
      const { data, error } = await supabaseClient
        .from("intensions")
        .insert([
          {
            parish: formData?.parish || null,
            demande: formData?.demande || "",
            jour: formData?.jour || "",
            heure: formData?.heure || "",
            numero: formData?.numero || "",
            payment_provider: "wave",
            status: "pending",
          },
        ])
        .select()
        .single();
 
      if (error) throw error;
 
      docId = data.id;
      localStorage.setItem("intensionDocId", docId);
    } catch (error) {
      console.error("Erreur Supabase :", error);
    }
    return docId;
  }
 
  async function markAsPaidAndGoToSuccess() {
    const id = await saveOrGetPendingDoc();
 
    if (id) {
      try {
        const { error } = await supabaseClient
          .from("intensions")
          .update({
            status: "paid",
            paid_at: new Date().toISOString(),
          })
          .eq("id", id);
 
        if (error) throw error;
      } catch (error) {
        console.error("Erreur mise à jour Supabase :", error);
      }
    }

    window.location.href = "../../intension-success.html";
  }

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