<script setup>
import { ref } from 'vue';
import timer from '../components/timer.vue';
import todo from '../components/todo.vue';
import music from '../components/music.vue';

</script>

<template>
    <main class="min-vh-100 overflow-hidden">
        <timer id="timer"/>
        <div class="container my-4">
            <div class="row g-4">
        
        <div class="col-12 col-md-6">
            <todo />
        </div>
        <div class="col-12 col-md-6">
            <music /> 
        </div>
        </div>
                </div>
    </main>
</template>

<style>


</style>
