<script setup>
import { ref,onUnmounted } from 'vue';

const duracion=25*60;
var rondas=4;
const des=5*60;
const desb=15*60;

const tiempo=ref(duracion);
const duracionDescanso=ref(des);
const duracionDescansoBonus=ref(desb);
const corriendo=ref(false);
const enDescanso=ref(false);
const display=ref('25m :00s');

let timeInterval=null;

const actualizar=()=>{
const totalSegundos = enDescanso.value ? duracionDescanso.value : tiempo.value;    const minutes=Math.floor(totalSegundos/60);
    const seconds=totalSegundos%60;

    const minutoss=minutes < 10 ? `0${minutes}` : minutes;
    const segundos = seconds < 10 ? `0${seconds}` : seconds;
    display.value = `${minutoss}m  :${segundos}s`;

};

const start=()=>{
    enDescanso.value = false;
    if(corriendo.value)return;
    corriendo.value=true;

    timeInterval=setInterval(()=>{
        if(tiempo.value>0){
            tiempo.value--;
            actualizar();
        }else{
            pause();
            duracionDescanso.value = rondas > 0 ? des : duracionDescansoBonus.value;            actualizar();
            descanso();
        }

    },1000);

};

const descanso=()=>{
    enDescanso.value = true;
    if(corriendo.value)return;
    corriendo.value=true;
    timeInterval=setInterval(()=>{
        if(duracionDescanso.value>0){
            duracionDescanso.value--;
            actualizar();
        }else{
            pause();
            if (rondas>0){
                rondas--;
                tiempo.value=duracion;
                actualizar();
                start();
            }else{
            reset();
        }
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
    enDescanso.value = false;
    pause();
    rondas = 4;
    tiempo.value = duracion;
    duracionDescanso.value = des;
    duracionDescansoBonus.value = desb;
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
            <h1 class="font-bitcount fw-bold">
                DoroDoro
            </h1>
        </div>
        <div class="d-flex justify-content-center">
            <span class="text-md-center d-flex justify-content-center fs-2 fw-bold font-bitcount">
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
