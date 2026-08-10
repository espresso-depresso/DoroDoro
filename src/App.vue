<script setup>
import { ref } from 'vue';
import headers from './components/header.vue';
import footers from './components/footer.vue';
import timer from './components/timer.vue';
import todo from './components/todo.vue';
import music from './components/music.vue';

</script>

<template>
<headers/>
  <main class="min-vh-100 overflow-hidden">
    <timer />
    <div class=" row">
      <div class="col">
        <todo />
      </div>
      <div class="col">
        <music /> 
      </div>
    </div>
  </main>
<footers/>
</template>

<style>

</style>
