<script setup>
import { ref ,watch} from 'vue';
import settings from '@/components/settings.vue'

const isModalVisible = ref(false);

const handleConfirm = () => {
    alert('Action Confirmed!');
    isModalVisible.value = false;
};

//
const Pomodoro = ref(localStorage.getItem(("duracion")/60) || 25);
watch(Pomodoro, (p) => {
    localStorage.setItem("duracion", p*60);
});

//
const shortBreak = ref(localStorage.getItem(("des")/60) || 5);
watch(shortBreak, (d) => {
    localStorage.setItem("des", d*60);
});

//
const longBreak = ref(localStorage.getItem(("desb")/60) || 15);
watch(longBreak, (db) => {
    localStorage.setItem("desb", db*60);
});


</script>

<template>
<nav class="navbar bg-lightpink">   
    <div class="container-fluid">
        <a class="navbar-brand justify-content-start font-bitcount fs-3 fw-semibold text-darkpurple" href="#">DoroDoro</a>
        <ul class="nav justify-content-end">
        <li class="nav-item p-2">
            <RouterLink :to="{hash:'#info'}" class="nav-link btn-light text-darkpurple rounded-2">Info</RouterLink>
        </li>
        <li class="nav-item p-2">
            <button  @click="isModalVisible=true" class="nav-link btn-light text-darkpurple rounded-2 ">Settings</button>
        </li>
    </ul>
    </div>
</nav>

    <settings :isOpen="isModalVisible" @close="isModalVisible = false">
        <template #header>
            <h2 class="font-bitcount">Settings</h2>
        </template>
<template #body>
    <div>
        <label for="range4" class="form-label">Pomodoro</label>
        <input v-model="Pomodoro" type="range" class="form-range" min="15" max="60" value="25" step="5" id="range4">
        <output for="range4" id="Pomodoro" aria-hidden="true">{{ Pomodoro }}</output>
    </div>

    <div>
        <label for="range4" class="form-label">Short Break</label>
        <input v-model="shortBreak" type="range" class="form-range" min="5" max="30" value="5" step="5" id="range4">
        <output for="range4" id="shortBreak" aria-hidden="true">{{ shortBreak }}</output>
    </div>
    
    <div>
        <label for="range4" class="form-label">Long Break</label>
        <input v-model="longBreak" type="range" class="form-range " min="5" max="50" value="15" step="5" id="range4">
        <output for="range4" id="longBreak" aria-hidden="true">{{ longBreak }}</output>
    </div>
    

</template>

        <template #footer>
            <button class="bg-skyblue  rounded-1 border-1 border-pastelblue px-3" @click="isModalVisible = false">Cancel</button>
        </template>
    </settings>
</template>

<style scoped>

</style>
