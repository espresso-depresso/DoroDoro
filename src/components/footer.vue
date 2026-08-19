<script setup>
import { ref } from 'vue';
</script>

<template>
    <div class="bg-lightpink mb-0 pb-0">
        <nav class="navbar bg-lightpink">   
        <div class="container-fluid">
            <a class="navbar-brand justify-content-start font-bitcount" href="#">DoroDoro</a>
            <ul class="nav justify-content-end">
            <li class="nav-item p-2">
                <RouterLink :to="{ hash: '#info' }" class="nav-link btn-light text-darkpurple rounded-2 ">Info</RouterLink>
            </li>
            <li class="nav-item p-2">
                <RouterLink to="/app" class="nav-link btn-light text-darkpurple rounded-2 ">Simple page</RouterLink>
            </li>
            </ul>
        </div>
        </nav>

        <div class="justify-content-center align-items-center text-center my-1 bg-lightpink">
        <a href="https://github.com/espresso-depresso" target="_blank" class="text-darkpurple">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-5" width="2em" height="2em" viewBox="0 0 24 24"><title>github</title><path fill="currentColor" d="M23 9v6h-1v2h-1v2h-1v1h-1v1h-1v1h-2v1h-1v-5h-1v-1h1v-1h2v-1h1v-1h1V9h-1V6h-2v1h-1v1h-1V7h-4v1H9V7H8V6H6v3H5v5h1v1h1v1h2v2H7v-1H6v-1H4v1h1v2h1v1h3v3H8v-1H6v-1H5v-1H4v-1H3v-2H2v-2H1V9h1V7h1V5h1V4h1V3h2V2h2V1h6v1h2v1h2v1h1v1h1v2h1v2z"/></svg>
        </a>

        <a href="https://www.instagram.com/yofknangel_ale/" target="_blank" class="text-darkpurple">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-5" width="2em" height="2em" viewBox="0 0 24 24"><title>instagram</title><path fill="currentColor" d="M17 9V8h-1V7h-1V6H9v1H8v1H7v1H6v6h1v1h1v1h1v1h6v-1h1v-1h1v-1h1V9zm-1 5h-1v1h-1v1h-4v-1H9v-1H8v-4h1V9h1V8h4v1h1v1h1z"/><path fill="currentColor" d="M22 5V3h-1V2h-2V1H5v1H3v1H2v2H1v14h1v2h1v1h2v1h14v-1h2v-1h1v-2h1V5zm-1 14h-1v1h-1v1H5v-1H4v-1H3V5h1V4h1V3h14v1h1v1h1z"/><path fill="currentColor" d="M17 5h2v2h-2z"/></svg>
        </a>
        </div>

        <div class="justify-content-center align-items-center text-center my-1 bg-lightpink">
        <p class="text-muted font-bitcount">@DoroDoro 2026. All rights reserved.</p>
        </div>
    </div>
</template>

<style scoped>
</style>