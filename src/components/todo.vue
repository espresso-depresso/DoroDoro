<script setup>
import { ref } from 'vue';

const input=ref('');
const lista=ref([]);

const agregar =()=>{
    const texto=input.value.trim();
    if(texto==='')return;

        lista.value.push({
            id:'check-'+Date.now(),
            texto:texto,
            completado:false
        });

    input.value='';

};

</script>

<template>
    <section class="d-flex flex-column align-items-center justify-content-center">
        <span class="font-bitcount h1">To-do list</span>

        <div class="row">
            <div class="col">
                <input 
                type="text" 
                class="form-control" 
                v-model="input" 
                @key.up="agregar"
                placeholder="Add a new task..." />
            </div>
            <div class="col">
                <button 
                type='button' 
                @click="agregar" 
                class="btn btn-danger">Agregar</button>
            </div>
        </div>
        <div class="w-100 mt-3" style="max-width: 300px;">
            <div v-for="tarea in lista" :key="tarea.id" class="form-check m-2">
                <input 
                    type="checkbox" 
                    class="form-check-input" 
                    :id="tarea.id" 
                    v-model="tarea.completado"
                />
                <label class="form-check-label" :for="tarea.id">
                    {{ tarea.texto }}
                </label>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>
