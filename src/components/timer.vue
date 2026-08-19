<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useSound } from '@vueuse/sound'
import drumSfx from '../sounds/bell.mp3'

const{play}=useSound(drumSfx);

if (!localStorage.getItem('duracion')) localStorage.setItem('duracion', 25 * 60);
if (!localStorage.getItem('rondas')) localStorage.setItem('rondas', 4);
if (!localStorage.getItem('des')) localStorage.setItem('des', 5 * 60);
if (!localStorage.getItem('desb')) localStorage.setItem('desb', 15 * 60);


const duracion = parseInt(localStorage.getItem('duracion'), 10);
let rondas = parseInt(localStorage.getItem('rondas'), 10);
const des = parseInt(localStorage.getItem('des'), 10);
const desb = parseInt(localStorage.getItem('desb'), 10);

const tiempo = ref(duracion);
const duracionDescanso = ref(des);
const duracionDescansoBonus = ref(desb);
const corriendo = ref(false);
const enDescanso = ref(false);
const display = ref('');

let timeInterval=null;

const actualizar = () => {
    const totalSegundos = enDescanso.value ? duracionDescanso.value : tiempo.value;
    const minutes = Math.floor(totalSegundos / 60);
    const seconds = totalSegundos % 60;

    const minutoss = minutes < 10 ? `0${minutes}` : minutes;
    const segundos = seconds < 10 ? `0${seconds}` : seconds;
    display.value = `${minutoss}m :${segundos}s`;
};

const start=()=>{
    enDescanso.value = false;
    if (corriendo.value) return;

    corriendo.value = true;
    clearInterval(timeInterval); // Ensure no duplicate intervals

    timeInterval = setInterval(() => {
        if (tiempo.value > 0) {
        tiempo.value--;
        actualizar();
        } else {
        pause();
        play();
        duracionDescanso.value = rondas > 0 ? des : duracionDescansoBonus.value;
        actualizar();
        descanso();
        }
    }, 1000);
};

const descanso=()=>{
    enDescanso.value = true;
    if (corriendo.value) return;

    corriendo.value = true;
    clearInterval(timeInterval);

    timeInterval = setInterval(() => {
        if (duracionDescanso.value > 0) {
        duracionDescanso.value--;
        actualizar();
        } else {
        pause();
        if (rondas > 0) {
            rondas--;
            tiempo.value = duracion;
            play();
            actualizar();
            start();
        } else {
            reset();
        }
        }
    }, 1000);
};

const pause=()=>{
    corriendo.value=false;
    if(timeInterval){
        clearInterval(timeInterval);
        timeInterval=null;
    }
};


const reset=()=>{
    enDescanso.value = false;
    pause();
    rondas = 4;
    tiempo.value = duracion;
    duracionDescanso.value = des;
    duracionDescansoBonus.value = desb;
    actualizar();
};




//
const ejecutarEjemplo = () => {
    const anchoPopup = 300;
    const altoPopup = 250;
    const centroX = (window.screen.availWidth - anchoPopup) / 2;
    const centroY = (window.screen.availHeight - altoPopup) / 2;

    const nuevaVentana = window.open(
        '',
        'DoroDoroMini',
        `width=${anchoPopup},height=${altoPopup},top=${centroY},left=${centroX},resizable=yes`
    );

    if (!nuevaVentana) {
        alert('Tu navegador ha bloqueado la ventana emergente.');
        return;
    }

    nuevaVentana.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>DoroDoro Mini</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-danger-subtle text-dark d-flex align-items-center justify-content-center vh-100 m-0">
            <div class="text-center">
            <h2 class="fs-4 fw-bold mb-3">DoroDoro Mini</h2>
            <div class="fs-1 font-bitcount mb-2">${display.value}</div>
            <p class="text-muted small">${enDescanso.value ? 'Tiempo de descanso' : 'Tiempo de trabajo'}</p>
            </div>
        </body>
        </html>
    `);

    nuevaVentana.focus();
};

onMounted(() => {
    actualizar();
});
onUnmounted(()=>{
pause();
});

</script>

<template>
<section class="container-fluid bg-pastelpurple bg-opacity-50 p-3">
    <div class="rounded rounded-5 bg-pastelpurple p-3">
        <div class="d-flex justify-content-center">
            <h1 class="font-bitcount fw-semibold text-darkpurple">
                DoroDoro
            </h1>
        </div>
        <div class="d-flex justify-content-center">
            <span class="text-md-center d-flex justify-content-center fs-2 fw-semibold font-bitcount text-darkpurple">
                {{ display }}
            </span>        </div>
        <div>
            <div class="d-flex justify-content-center p-3">
                <button class="btn btn-light m-2" @click="start" id="start">Start</button>
                <button class="btn btn-light m-2" @click="pause" id="pause">Pause</button>
                <button class="btn btn-light m-2" id="reset" @click="reset">Reset</button>
                <button class="btn btn-light m-2" id="ejecutarEjemplo" @click="ejecutarEjemplo">Window</button>

            </div>
        </div>
    </div>

</section>
</template>

<style scoped>

</style>
