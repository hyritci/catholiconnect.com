/* ==========================================================
   firebase-config.js — Connexion à Firebase / Firestore
   ⚠️ À COMPLÉTER : remplace les valeurs ci-dessous par celles
   de TON projet Firebase (Console Firebase > Paramètres du
   projet > Général > "Vos applications" > SDK Config).

   Ce fichier doit être chargé APRÈS les scripts Firebase
   (firebase-app-compat.js et firebase-firestore-compat.js)
   et AVANT le script de la page qui l'utilise
   (ex: intension-payment.js).
   ========================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyDTuJtgvzOTYzWo3y80qziR9l46t6PrTAk",
  authDomain: "catholiconnect-2d373.firebaseapp.com",
  projectId: "catholiconnect-2d373",
  storageBucket: "catholiconnect-2d373.firebasestorage.app",
  messagingSenderId: "45053343097",
  appId: "1:45053343097:web:c2602547938a5a443eaba8",
};

// Initialisation (utilise le SDK "compat", chargé en balises <script> classiques)
firebase.initializeApp(firebaseConfig);

// Instance Firestore réutilisable dans les autres fichiers JS
const db = firebase.firestore();