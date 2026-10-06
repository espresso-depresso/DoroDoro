<script setup>
import { ref, watch } from 'vue';
import settings from '@/components/settings.vue';

const isModalVisible = ref(false);
const getStoredNumber = (key, fallback) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null || storedValue === '') return fallback;

  const value = Number(storedValue);
  return Number.isFinite(value) ? value : fallback;
};

const pomodoro = ref(getStoredNumber('duracion', 25 * 60) / 60);
const shortBreak = ref(getStoredNumber('des', 5 * 60) / 60);
const longBreak = ref(getStoredNumber('desb', 15 * 60) / 60);
const rounds = ref(getStoredNumber('rondas', 4));

const persistSettings = () => {
  localStorage.setItem('duracion', String(Math.round(pomodoro.value * 60)));
  localStorage.setItem('des', String(Math.round(shortBreak.value * 60)));
  localStorage.setItem('desb', String(Math.round(longBreak.value * 60)));
  localStorage.setItem('rondas', String(Math.round(rounds.value)));
  window.dispatchEvent(new CustomEvent('study-settings-updated'));
};

const toggleTheme = () => {
  const nextTheme = !document.body.classList.contains('theme-dark');
  window.dispatchEvent(new CustomEvent('theme-change', { detail: nextTheme }));
};

watch([pomodoro, shortBreak, longBreak, rounds], persistSettings, { immediate: true });
</script>

<template>
  <nav class="navbar top-nav">
    <div class="container-fluid">
      <a class="navbar-brand justify-content-start font-bitcount brand-name" href="#">DoroDoro</a>
      <ul class="nav justify-content-end align-items-center gap-2">
        <li class="nav-item p-1">
          <RouterLink :to="{ hash: '#info' }" class="nav-link action-pill">Inicio</RouterLink>
        </li>
        <li class="nav-item p-1">
          <button @click="isModalVisible = true" class="nav-link action-pill border-0">Ajustes</button>
        </li>
        <li class="nav-item p-1">
          <button @click="toggleTheme" class="nav-link action-pill border-0" aria-label="Cambiar modo oscuro">Modo</button>
        </li>
      </ul>
    </div>
  </nav>

  <settings :isOpen="isModalVisible" @close="isModalVisible = false">
    <template #header>
      <h2 class="font-bitcount mb-0">Ajustes de estudio</h2>
    </template>

    <template #body>
      <div class="settings-group">
        <label class="form-label fw-semibold">Foco</label>
        <input v-model="pomodoro" type="range" class="form-range" min="15" max="60" step="5" />
        <output class="settings-output">{{ pomodoro }} min</output>
      </div>

      <div class="settings-group">
        <label class="form-label fw-semibold">Descanso corto</label>
        <input v-model="shortBreak" type="range" class="form-range" min="5" max="30" step="5" />
        <output class="settings-output">{{ shortBreak }} min</output>
      </div>

      <div class="settings-group">
        <label class="form-label fw-semibold">Descanso largo</label>
        <input v-model="longBreak" type="range" class="form-range" min="5" max="50" step="5" />
        <output class="settings-output">{{ longBreak }} min</output>
      </div>

      <div class="settings-group">
        <label class="form-label fw-semibold">Ciclos por bloque</label>
        <input v-model="rounds" type="range" class="form-range" min="2" max="8" step="1" />
        <output class="settings-output">{{ rounds }} rondas</output>
      </div>
    </template>

    <template #footer>
      <button class="btn btn-darkblue" @click="isModalVisible = false">Guardar</button>
    </template>
  </settings>
</template>

<style scoped>
.top-nav {
  background: rgba(255, 200, 221, 0.7);
  backdrop-filter: blur(10px);
}

.brand-name {
  color: #221429;
  font-size: clamp(1.6rem, 2vw, 2.2rem);
}

.action-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  color: #221429;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.action-pill:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 25px rgba(34, 20, 41, 0.08);
}

.settings-group {
  margin-bottom: 1.25rem;
}

.settings-output {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #003566;
}
</style>
