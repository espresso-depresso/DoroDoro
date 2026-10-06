<script setup>
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

const apikey = import.meta.env.VITE_YOUTUBE_API_KEY;

const song = ref('');
const videoId = ref('');
const loading = ref(false);
const music = ref('Estudio tranquilo');
const mood = ref('Deep focus');
const presets = ['deep focus', 'lofi beats', 'rain ambience', 'jazz piano', 'study beats'];

const decode = (text) => {
  const doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.body.textContent || '';
};

const pickMood = () => {
  const result = presets[Math.floor(Math.random() * presets.length)];
  mood.value = result;
  song.value = result;
};

const buscar = async () => {
  const query = song.value.trim();
  if (!query) return;

  loading.value = true;
  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apikey}&type=video&maxResults=1`);
    const data = await res.json();

    if (data.items && data.items.length > 0) {
      const resultado = data.items[0];
      videoId.value = resultado.id.videoId;
      music.value = decode(resultado.snippet.title);
      mood.value = query;
      return;
    }

    Swal.fire({
      title: 'No se encontró nada',
      text: 'Prueba otra búsqueda o un tema más específico.',
      icon: 'info',
      confirmButtonColor: '#003566',
      width: 400
    });
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    Swal.fire({
      title: 'Ups',
      text: 'No se pudo cargar la música en este momento.',
      icon: 'error',
      confirmButtonColor: '#003566'
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  pickMood();
});
</script>

<template>
  <section class="music-panel">
    <div class="d-flex flex-column align-items-center w-100">
      <span id="music" class="font-bitcount h1 text-darkblue">{{ music || 'Buscar música...' }}</span>
      <small class="mood-indicator">Ambiente: {{ mood }}</small>

      <div class="input-group justify-content-center" style="max-width: 420px;">
        <input
          v-model="song"
          type="text"
          @keyup.enter="buscar"
          class="form-control"
          placeholder="Busca una canción de estudio..."
        />
        <button @click="buscar" class="btn btn-darkblue">
          {{ loading ? 'Buscando...' : 'Buscar' }}
        </button>
      </div>

      <div class="preset-row">
        <button class="preset-btn" @click="song = 'lofi beats'; buscar()">Lofi</button>
        <button class="preset-btn" @click="song = 'rain ambience'; buscar()">Lluvia</button>
        <button class="preset-btn" @click="song = 'piano focus'; buscar()">Piano</button>
      </div>

      <div class="justify-content-center" v-if="videoId">
        <div class="mt-2 p-1 style-player">
          <iframe
            :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`"
            title="YouTube music player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.music-panel {
  width: 100%;
  padding: 1rem;
}

.mood-indicator {
  display: block;
  margin-bottom: 0.85rem;
  color: rgba(34, 20, 41, 0.72);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.preset-row {
  width: 100%;
  max-width: 420px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.preset-btn {
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.45rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #003566;
}

.style-player {
  width: 100%;
  max-width: 1100px;
  aspect-ratio: 16 / 9;
  margin: 0 auto;
}

.style-player iframe {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
</style>
