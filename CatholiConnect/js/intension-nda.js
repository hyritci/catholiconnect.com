/* ==========================================================
   intension-details.js — Étape 2 de "Intension"
   Récupère la paroisse choisie à l'étape 1, gère le formulaire :
   - limite de mots avec popup dans "Ecrire sa demande"
   - listes Jour / Heure dépendantes l'une de l'autre
   - champ "numero a debiter" numérique uniquement
   - sauvegarde automatique du brouillon (persistance au retour)
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ---- Références DOM ----
  const btnBack = document.getElementById("btnBack");
  const parishNameEl = document.getElementById("parishName");
  const parishLocationEl = document.getElementById("parishLocation");

  const demandeText = document.getElementById("demandeText");
  const btnExemples = document.getElementById("btnExemples");

  const inputJour = document.getElementById("inputJour");
  const inputHeure = document.getElementById("inputHeure");
  const inputNumero = document.getElementById("inputNumero");

  const btnSuivant = document.getElementById("btnSuivant");
  const btnClear = document.getElementById("btnClear");

  const wordLimitModal = document.getElementById("wordLimitModal");
  const btnModalOk = document.getElementById("btnModalOk");

  const MAX_WORDS = 40;
  const DRAFT_KEY = "intensionFormDraft";

  // Horaires disponibles selon le jour choisi
  const HEURES_PAR_JOUR = {
    Lundi: ["06H"],
    Mardi: ["06H"],
    Mercredi: ["06H", "19H"],
    Jeudi: ["06H"],
    Vendredi: ["06H"],
    Samedi: ["07H", "19H"],
    Dimanche: ["07H", "09H", "11H"],
  };

  // ---- Récupération de la paroisse choisie à l'étape précédente ----
  const savedParish = JSON.parse(localStorage.getItem("selectedParish") || "null");
  if (savedParish) {
    parishNameEl.textContent = savedParish.name;
    parishLocationEl.textContent = savedParish.location;
  }

  // ---- Navigation retour ----
  btnBack.addEventListener("click", () => {
    window.location.href = "../../intension.html";
  });

  // ---- Redirection vers la page d'exemples ----
  btnExemples.addEventListener("click", () => {
    saveDraft(); // on garde tout ce qui a déjà été saisi avant de quitter la page
    window.location.href = "../../intension-exemples.html";
  });

  // Si l'utilisateur revient avec un texte copié depuis la page d'exemples,
  // on lui propose de le coller automatiquement s'il n'a rien écrit encore
  const copiedText = localStorage.getItem("copiedExempleText");
  if (copiedText && !demandeText.value) {
    demandeText.placeholder = "Ecrire sa demande (ou coller le texte copié)";
  }

  /* =========================================================
     1) LIMITE DE MOTS + POPUP sur "Ecrire sa demande"
     ========================================================= */
  let popupAlreadyShown = false;

  function countWords(text) {
    const trimmed = text.trim();
    if (trimmed === "") return 0;
    return trimmed.split(/\s+/).length;
  }

  demandeText.addEventListener("input", () => {
    const wordCount = countWords(demandeText.value);

    if (wordCount > MAX_WORDS && !popupAlreadyShown) {
      showWordLimitModal();
      popupAlreadyShown = true;
    }

    // On réarme le popup si l'utilisateur repasse sous la limite puis la dépasse à nouveau
    if (wordCount <= MAX_WORDS) {
      popupAlreadyShown = false;
    }
  });

  function showWordLimitModal() {
    wordLimitModal.hidden = false;
  }

  function hideWordLimitModal() {
    wordLimitModal.hidden = true;
  }

  btnModalOk.addEventListener("click", () => {
    hideWordLimitModal();
    demandeText.focus();
  });

  /* =========================================================
     2) LISTES JOUR / HEURE DÉPENDANTES
     ========================================================= */
  function populateHeures(jour, previousValue) {
    const heures = HEURES_PAR_JOUR[jour] || [];

    inputHeure.innerHTML = '<option value="" disabled selected>Heure...</option>';

    heures.forEach((heure) => {
      const option = document.createElement("option");
      option.value = heure;
      option.textContent = heure;
      inputHeure.appendChild(option);
    });

    inputHeure.disabled = heures.length === 0;

    // Si l'heure précédemment choisie est toujours valide pour ce jour, on la garde
    if (previousValue && heures.includes(previousValue)) {
      inputHeure.value = previousValue;
    }
  }

  inputJour.addEventListener("change", () => {
    populateHeures(inputJour.value, null);
    const wrapper = inputHeure.closest(".field-wrapper");
    wrapper.classList.remove("has-error");
  });

  /* =========================================================
     3) CHAMP "NUMERO A DEBITER" — CHIFFRES UNIQUEMENT
     ========================================================= */
  inputNumero.addEventListener("input", () => {
    inputNumero.value = inputNumero.value.replace(/[^0-9]/g, "");
  });

  /* =========================================================
     4) SAUVEGARDE / RESTAURATION DU BROUILLON
     (pour retrouver les champs déjà remplis en cas de retour arrière)
     ========================================================= */
  function saveDraft() {
    const draft = {
      demande: demandeText.value,
      jour: inputJour.value,
      heure: inputHeure.value,
      numero: inputNumero.value,
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }

  function restoreDraft() {
    const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
    if (!draft) return;

    if (draft.demande) demandeText.value = draft.demande;

    if (draft.jour) {
      inputJour.value = draft.jour;
      populateHeures(draft.jour, draft.heure);
    }

    if (draft.numero) inputNumero.value = draft.numero;
  }

  // On sauvegarde à chaque saisie, sur tous les champs
  [demandeText, inputJour, inputHeure, inputNumero].forEach((input) => {
    input.addEventListener("input", saveDraft);
    input.addEventListener("change", saveDraft);
  });

  // Restauration au chargement de la page
  restoreDraft();
  
  
   /* =========================================================
     BOUTON "TOUT EFFACER"
     ========================================================= */
  btnClear.addEventListener("click", () => {
    demandeText.value = "";
    popupAlreadyShown = false;
 
    inputJour.value = "";
    inputHeure.innerHTML = '<option value="" disabled selected>Heure...</option>';
    inputHeure.disabled = true;
 
    inputNumero.value = "";
 
    // On retire aussi les messages d'erreur affichés
    [demandeText, inputJour, inputHeure, inputNumero].forEach((input) => {
      input.closest(".field-wrapper").classList.remove("has-error");
    });
 
    // On efface le brouillon sauvegardé pour ne pas le restaurer plus tard
    localStorage.removeItem(DRAFT_KEY);
 
    demandeText.focus();
  });
  

  /* =========================================================
     VALIDATION ET PASSAGE À L'ÉTAPE SUIVANTE
     ========================================================= */
  btnSuivant.addEventListener("click", () => {
    const isValid = validateForm();
    if (!isValid) return;

    const formData = {
      parish: savedParish,
      demande: demandeText.value.trim(),
      jour: inputJour.value.trim(),
      heure: inputHeure.value.trim(),
      numero: inputNumero.value.trim(),
    };

    localStorage.setItem("intensionForm", JSON.stringify(formData));
    saveDraft(); // le brouillon reste disponible si l'utilisateur revient en arrière

    window.location.href = "intension-nda-confirmation.html";
  });

  // ---- Vérifie que tous les champs sont renseignés ----
  // Retourne true si le formulaire est valide, false sinon.
  // Affiche "case a renseigner" sous chaque champ vide.
  function validateForm() {
    const fields = [
      { input: demandeText, wrapper: demandeText.closest(".field-wrapper") },
      { input: inputJour, wrapper: inputJour.closest(".field-wrapper") },
      { input: inputHeure, wrapper: inputHeure.closest(".field-wrapper") },
      { input: inputNumero, wrapper: inputNumero.closest(".field-wrapper") },
    ];

    let firstInvalidInput = null;

    fields.forEach(({ input, wrapper }) => {
      const isEmpty = input.value.trim() === "";
      wrapper.classList.toggle("has-error", isEmpty);

      if (isEmpty && !firstInvalidInput) {
        firstInvalidInput = input;
      }
    });

    if (firstInvalidInput) {
      firstInvalidInput.focus();
      return false;
    }

    return true;
  }

  // ---- On efface l'erreur d'un champ dès que l'utilisateur le remplit ----
  [demandeText, inputJour, inputHeure, inputNumero].forEach((input) => {
    const clearError = () => {
      const wrapper = input.closest(".field-wrapper");
      if (input.value.trim() !== "") {
        wrapper.classList.remove("has-error");
      }
    };
    input.addEventListener("input", clearError);
    input.addEventListener("change", clearError);
  });
});