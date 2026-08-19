<script setup>
import { ref,watch } from 'vue';

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

watch(lista,(nuevalista)=>
{
    localStorage.setItem('milista', JSON.stringify(nuevalista));
}, {deep:true}
);

</script>

<template>
    <section class="d-flex flex-column align-items-center w-100">
        <span class="font-bitcount h1 text-darkblue">To-do list</span>

        <div class="input-group justify-content-center" style="max-width: 350px;">
        <input 
            type="text" 
            class="form-control" 
            v-model="input" 
            @keyup.enter="agregar"
            placeholder="Add a new task..." 
        />
        <button 
            type="button" 
            @click="agregar" 
            class="btn btn-darkblue">Agregar</button>
    </div>

        <div class="w-100 mt-3 d-flex flex-column gap-2" style="max-width: 350px;">
            <div 
                v-for="tarea in lista" 
                :key="tarea.id" 
                class="task-item d-flex align-items-center p-2 px-3 rounded-3 bg-pastelpurple shadow-sm"
                :class="{ 'is-completed': tarea.completado }"
            >
                <input 
                    type="checkbox" 
                    class="form-check-input my-0 me-2 flex-shrink-0 cursor-pointer" 
                    :id="tarea.id" 
                    v-model="tarea.completado"
                />
                <label 
                    class="task-label form-check-label font-bitcount h5 text-darkblue my-0 text-truncate user-select-none cursor-pointer" 
                    :class="{ 'text-decoration-line-through opacity-50': tarea.completado }"
                    :for="tarea.id"
                >
                    {{ tarea.texto }}
                </label>
            </div>
        </div>
    </section>
</template>

<style scoped>
.task-item {
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
    border: 1px solid rgba(0, 0, 0, 0.04);
}

.task-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08) !important;
}

.task-item.is-completed {
    background-color: #f0edf8 !important;
}

.task-label {
    transition: color 0.2s ease, opacity 0.2s ease;
}

.cursor-pointer {
    cursor: pointer;
}
</style>
