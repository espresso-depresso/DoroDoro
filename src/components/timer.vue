<script setup>
import { ref,onUnmounted } from 'vue';

const duracion=25*60;
var rondas=4;
const descanso=5*60;
const descansoBonus=15*60;

const tiempo=ref(duracion);
const corriendo=ref(false);
const display=ref('25m :00s');

let timeInterval=null;

const actualizar=()=>{
    const minutes=Math.floor(tiempo.value/60);
    const seconds=tiempo.value%60;

    const segundos = seconds < 10 ? `0${seconds}` : seconds;
    display.value = `${minutes}m  :${segundos}s`;

};

const start=()=>{
    if(corriendo.value)return;
    corriendo.value=true;

    timeInterval=setInterval(()=>{
        if(tiempo.value>0){
            tiempo.value--;
            actualizar();
        }else{
            pause();
            display.value="xxx";
        }

    },1000);

};

const pause=()=>{
    corriendo.value=false;
    if(timeInterval){
        clearInterval(timeInterval);
        timeInterval=null;
    }
};


const reset=()=>{
    pause();
    tiempo.value=duracion;
    actualizar();
};

onUnmounted(()=>{
pause();
});

</script>

<template>
<section class="container-fluid p-3">
    <div class="rounded rounded-5 bg-success-subtle p-3 ">
        <div class="d-flex justify-content-center">
            <h1>
                DoroDoro
            </h1>
        </div>
        <div class="d-flex justify-content-center">
            <span class="text-md-center d-flex justify-content-center fs-2 fw-bold">
                {{ display }}
            </span>        </div>
        <div>
            <div class="d-flex justify-content-center p-3">
                <button class="btn btn-outline-success m-1" @click="start" id="start">Start</button>
                <button class="btn btn-outline-success m-1" @click="pause" id="pause">Pause</button>
                <button class="btn btn-outline-success m-1" id="reset" @click="reset">Reset</button>
            </div>
        </div>
    </div>

</section>
</template>

<style scoped>

</style>
