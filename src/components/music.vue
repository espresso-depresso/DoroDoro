<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const apikey=import.meta.env.VITE_API_KEY_MUSIC;

const song=ref('');
const videoId = ref('');
const loading = ref(false);
const music=ref('Song tittle');

const decode=(text)=>{
    const textarea=document.createElement('textarea');
    textarea.innerHTML=text;
    return textarea.value;

};

const buscar=async()=>{
    if(!song.value.trim()) return;
    loading.value = true;
    try{
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(song.value)}&key=${apikey}&type=video`);
        const data = await res.json();
        if(data.items && data.items.length > 0){
            videoId.value = data.items[0].id.videoId;
            const resultado =data.items[0];
            const titulo=decode(resultado.snippet.title);
            music.value=`${titulo}`;
        } else {
            console.log('No results found');
            Swal.fire({
                title:"No encontrada",
                width:400,
                padding:"3em",
                color:"#e76f51",
                background:"fff url(/img/background.jpeg)",
                backdrop:`
                rgba(231, 111, 81,0.4)
                `    
            });
        }
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
    } finally {
        loading.value = false;
    }

};

</script>

<template>
<section>
    <div class="d-flex flex-column align-items-center justify-content-center">
        <span id="music" class="font-bitcount h1">{{ music || `busca una cancion`}}</span>
        <div class="row">
            <div class="col">
                <input type="text" @keyup.enter="buscar" class="form-control" v-model="song" placeholder="Search a song..." />
            </div>
            <div class="col">
                <button @click="buscar" class="btn btn-danger">{{ loading ? 'Buscando...' : 'Buscar' }}</button>
            </div>
        </div>
<div v-if="videoId" class="mt-3 style-player">
    <iframe 
        :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=${location.origin}`" 
        title="YouTube music player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
</div>
    </div>
</section>
</template>

<style scoped>

</style>
