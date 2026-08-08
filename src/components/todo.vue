<script setup>
import { ref } from 'vue';

</script>

<template>
    <section class="d-flex flex-column align-items-center justify-content-center">
        <h2 class="">To-do list</h2>

        <div class="row">
            <div class="col">
                <input type="text" class="form-control" placeholder="Add a new task..." />
            </div>
            <div class="col">
                <button type='submit' class="btn btn-danger">Agregar</button>
            </div>
        </div>
        <div class="form-check m-2">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                Default checkbox
            </label>
        </div>
    </section>
</template>

<style scoped>

</style>
