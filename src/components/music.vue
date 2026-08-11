<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const apikey=import.meta.env.VITE_YOUTUBE_API_KEY;

const song=ref('');
const videoId = ref('');
const loading = ref(false);
const music=ref('Song tittle');
const origin = ref(window.location.origin);

const decode=(text)=>{
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.body.textContent || '';

};

const buscar=async()=>{
    if(!song.value.trim()) return;
    loading.value = true;
    try{
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(song.value)}&key=${apikey}&type=video`);
        const data = await res.json();

        if(data.items && data.items.length > 0){
            const resultado = data.items[0];
            videoId.value = resultado.id.videoId;
            const titulo= decode(resultado.snippet.title);
            music.value=titulo;
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
        <div class="justify-content-center">
                <div v-if="videoId" class="mt-2 mr-2 p-1 style-player">
                <iframe 
                class="h-auto "
                v-if="videoId"
                :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"        
                title="YouTube music player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
                </iframe>
                </div>
            </div>
        
    </div>
</section>
</template>

<style scoped>
    .style-player{
        height: 100%;
        width:100%;
        max-width: 1000px;
        margin: 0 auto;
    }

    .style-player iframe{
        height: 100%;
        width:100%;
        max-width: 800px;
        border-radius:12px;
    }
</style>
