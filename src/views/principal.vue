<script setup>
import { ref } from 'vue';
import headers from '../components/header.vue';
import footers from '../components/footer.vue';
import timer from '../components/timer.vue';
import todo from '../components/todo.vue';
import music from '../components/music.vue';
import info from '../components/info.vue';

</script>

<template>
<headers/>
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
        <info id="info" class="justify-content-between p-3"/>
    </main>
<footers class="mb-0 pb-0"/>
</template>

<style>


</style>
