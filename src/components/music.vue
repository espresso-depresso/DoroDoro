<script setup>
import { ref } from 'vue';

const song=ref('');
const videoId = ref('');
const loading = ref(false);
const apikey='';

const buscar=async()=>{
    if(!song.value.trim()) return;
    loading.value = true;
    try{
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(song.value)}&key=${apikey}&type=video`);
        const data = await res.json();
        if(data.items && data.items.length > 0){
            videoId.value = data.items[0].id.videoId;
        } else {
            console.log('No results found');
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
        <span id="music">Tittle</span>
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
                :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`" 
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
