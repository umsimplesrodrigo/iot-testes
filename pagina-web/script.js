import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDyXCUngiPb610F3ClRGlDJERGMgrKEqzk",
    authDomain: "macaco-led.firebaseapp.com",
    databaseURL: "https://macaco-led-default-rtdb.firebaseio.com",
    projectId: "macaco-led",
    storageBucket: "macaco-led.firebasestorage.app",
    messagingSenderId: "520712162599",
    appId: "1:520712162599:web:01e418dd7500a56d0c2d02",
    measurementId: "G-02YKHV9C9B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const ledRef = ref(db, "controlar-led/led");

let estado_atual;
onValue(ledRef, (snapshot) => {
    if (snapshot.exists()) {
        estado_atual = snapshot.val();
        atualizarBotao(estado_atual);
        console.log("Estado atualizado do Firebase:", estado_atual);
    } else {
        console.log("Cade o snapshot seu bosta?");
    }
}, (error) => {
    console.log("Deu erro krai:", error);
});

function mudarEstado() {
    estado_atual = !estado_atual;
    set(ledRef, estado_atual);
    console.log("Led:", estado_atual);
}

function atualizarBotao(estado_atual) {
    let botao = document.getElementById("butaozin");
    botao.innerText = estado_atual ? "Ligado" : "Desligado";
    botao.style.backgroundColor = estado_atual ? "green" : "red";
}

window.onload = function() {
    document.getElementById("butaozin").addEventListener("click", mudarEstado);
}