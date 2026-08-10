/* ==========================================================
   firebase-config.js — Connexion à Firebase / Firestore
   ⚠️ À COMPLÉTER : remplace les valeurs ci-dessous par celles
   de TON projet Firebase (Console Firebase > Paramètres du
   projet > Général > "Vos applications" > SDK Config).

   Ce fichier doit être chargé APRÈS les scripts Firebase
   (firebase-app-compat.js et firebase-firestore-compat.js)
   et AVANT le script de la page qui l'utilise
   (ex: intension-confirmation.js).
   ========================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyDZDLEXSoBWzQbXHYmbeRvs7qNZw8dyB9E",
    authDomain: "catholiconnect-fee1c.firebaseapp.com",
    projectId: "catholiconnect-fee1c",
    storageBucket: "catholiconnect-fee1c.firebasestorage.app",
    messagingSenderId: "18221283067",
    appId: "1:18221283067:web:3c4c72c98a6e2d702e625e",
    measurementId: "G-P3B49GF7V9"
};

// Initialisation (utilise le SDK "compat", chargé en balises <script> classiques)
firebase.initializeApp(firebaseConfig);

// Instance Firestore réutilisable dans les autres fichiers JS
const db = firebase.firestore();