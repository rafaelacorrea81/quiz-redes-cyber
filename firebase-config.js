// firebase-config.js
// Configuração do Firebase para o Quiz Segurança de Redes
// ATENÇÃO: Estas são credenciais públicas do Firebase Web App.
// NÃO inclua service accounts, chaves privadas ou secrets aqui.
// A segurança é garantida pelas regras do Firestore.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    limit,
    where,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBm-oVFET9Roarmq2cmt6eDhAVKhltvGY8",
    authDomain: "quiz-redes-cyber.firebaseapp.com",
    projectId: "quiz-redes-cyber",
    storageBucket: "quiz-redes-cyber.firebasestorage.app",
    messagingSenderId: "968528786797",
    appId: "1:968528786797:web:98e4044cb8aa1a3de5d664",
    measurementId: "G-FXLZ58HTX1"
};

let app;
let db;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase inicializado com sucesso.");
} catch (error) {
    console.error("Erro ao inicializar Firebase:", error);
}

export { db, collection, addDoc, onSnapshot, query, orderBy, limit, where, serverTimestamp };
