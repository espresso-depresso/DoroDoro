<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useSound } from '@vueuse/sound';
import bellSfx from '../sounds/bell.mp3';

const { play } = useSound(bellSfx);

const getStoredNumber = (key, fallback) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null || storedValue === '') return fallback;

  const parsed = Number(storedValue);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const roundGoal = ref(getStoredNumber('rondas', 4));
const workDuration = ref(getStoredNumber('duracion', 25 * 60));
const shortBreakDuration = ref(getStoredNumber('des', 5 * 60));
const longBreakDuration = ref(getStoredNumber('desb', 15 * 60));
const completedFocusBlocks = ref(getStoredNumber('pomodoros_completados', 0));
const focusMinutesTotal = ref(getStoredNumber('focus_minutes_total', 0));

const mode = ref('focus');
const timeLeft = ref(workDuration.value);
const isRunning = ref(false);
const statusMessage = ref('Elige una tarea y empieza con calma.');
let intervalId = null;

const focusQuotes = [
  'Hoy tu objetivo es simple: una pieza de trabajo, un bloque claro.',
  'Tu mejor versión llega cuando empiezas, no cuando te sientes listo.',
  'Un foco breve y limpio vale más que un día distraído.',
  'Sigue el ritmo: respirar, pensar, avanzar.',
  'Tu constancia es más poderosa que la perfección.'
];

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const displayTime = computed(() => formatTime(timeLeft.value));
const modeLabel = computed(() => (mode.value === 'focus' ? 'Foco' : 'Descanso'));
const nextBreakType = computed(() => {
  const cycleComplete = completedFocusBlocks.value > 0 && completedFocusBlocks.value % roundGoal.value === 0;
  return cycleComplete ? 'descanso largo' : 'descanso corto';
});
const progressPercent = computed(() => {
  const total = mode.value === 'focus' ? workDuration.value : Math.max(1, getNextBreakDuration());
  return Math.min(100, ((total - timeLeft.value) / total) * 100);
});

const syncValues = () => {
  roundGoal.value = getStoredNumber('rondas', 4);
  workDuration.value = getStoredNumber('duracion', 25 * 60);
  shortBreakDuration.value = getStoredNumber('des', 5 * 60);
  longBreakDuration.value = getStoredNumber('desb', 15 * 60);
};

const getNextBreakDuration = () => {
  const longBreakNow = completedFocusBlocks.value > 0 && completedFocusBlocks.value % roundGoal.value === 0;
  return longBreakNow ? longBreakDuration.value : shortBreakDuration.value;
};

const persistStats = () => {
  localStorage.setItem('rondas', String(roundGoal.value));
  localStorage.setItem('duracion', String(workDuration.value));
  localStorage.setItem('des', String(shortBreakDuration.value));
  localStorage.setItem('desb', String(longBreakDuration.value));
  localStorage.setItem('pomodoros_completados', String(completedFocusBlocks.value));
  localStorage.setItem('focus_minutes_total', String(focusMinutesTotal.value));
};

const stopTimer = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  isRunning.value = false;
};

const resetTimer = () => {
  stopTimer();
  mode.value = 'focus';
  timeLeft.value = workDuration.value;
  statusMessage.value = 'Has reiniciado tu sesión de estudio.';
};

const chooseRandomPhrase = () => {
  const index = Math.floor(Math.random() * focusQuotes.length);
  statusMessage.value = focusQuotes[index];
};

const advancePhase = () => {
  play();

  if (mode.value === 'focus') {
    completedFocusBlocks.value += 1;
    focusMinutesTotal.value += Math.round(workDuration.value / 60);
    const longBreakNow = completedFocusBlocks.value > 0 && completedFocusBlocks.value % roundGoal.value === 0;
    mode.value = 'break';
    timeLeft.value = longBreakNow ? longBreakDuration.value : shortBreakDuration.value;
    statusMessage.value = longBreakNow
      ? '¡Gran bloque! Mereces un descanso más largo.'
      : 'Descansa, respira y vuelve con más claridad.';
  } else {
    mode.value = 'focus';
    timeLeft.value = workDuration.value;
    statusMessage.value = 'Vuelve al foco: una tarea, un paso a la vez.';
  }

  persistStats();
};

const startTimer = () => {
  if (isRunning.value) return;
  isRunning.value = true;
  intervalId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1;
      return;
    }

    advancePhase();
  }, 1000);
};

const pauseTimer = () => {
  stopTimer();
  statusMessage.value = 'Pausa activa. Toma un respiro y retoma cuando estés listo.';
};

const openMiniWindow = () => {
  const popup = window.open('', 'DoroDoroMini', 'width=340,height=260');
  if (!popup) {
    alert('El navegador bloqueó la ventana emergente.');
    return;
  }

  popup.document.write(`<!DOCTYPE html>
  <html>
    <head>
      <title>DoroDoro Mini</title>
      <meta charset="UTF-8" />
      <style>
        body { margin: 0; font-family: Arial; background: linear-gradient(135deg, #f4d8ff, #dff6ff); display: grid; place-items: center; color: #221429; }
        .card { text-align: center; padding: 1.5rem; border-radius: 22px; background: rgba(255,255,255,0.5); box-shadow: 0 14px 30px rgba(34,20,41,0.14); }
        .time { font-size: 2.4rem; font-weight: 700; margin: 0.5rem 0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div>${mode.value === 'focus' ? 'Foco' : 'Descanso'}</div>
        <div class="time">${displayTime.value}</div>
        <small>${statusMessage.value}</small>
      </div>
    </body>
  </html>`);
  popup.focus();
};

watch(
  [workDuration, shortBreakDuration, longBreakDuration, roundGoal],
  () => {
    persistStats();
    if (!isRunning.value) {
      timeLeft.value = mode.value === 'focus' ? workDuration.value : getNextBreakDuration();
    }
  },
  { deep: true }
);

window.addEventListener('study-settings-updated', () => {
  syncValues();
  if (!isRunning.value) {
    timeLeft.value = mode.value === 'focus' ? workDuration.value : getNextBreakDuration();
  }
});

onMounted(() => {
  syncValues();
  chooseRandomPhrase();
  timeLeft.value = workDuration.value;
});

onUnmounted(() => {
  stopTimer();
  window.removeEventListener('study-settings-updated', syncValues);
});
</script>

<template>
  <section class="timer-shell">
    <div class="timer-card">
      <div class="timer-header">
        <span class="timer-badge">{{ modeLabel }}</span>
        <span class="timer-rounds">{{ completedFocusBlocks }} / {{ roundGoal }} ciclos</span>
      </div>

      <div class="timer-display">{{ displayTime }}</div>
      <p class="timer-status">{{ statusMessage }}</p>

      <div class="mini-stats">
        <div class="stat-pill">
          <span>⊹₊⋆｡°✩</span>
          <strong>{{ completedFocusBlocks }}</strong>
        </div>
        <div class="stat-pill">
          <span>⋆ ˖ ⏱︎.ᐟ </span>
          <strong>{{ focusMinutesTotal }} min</strong>
        </div>
        <div class="stat-pill">
          <span>(ᴗ˳ᴗ)ᶻ𝗓𐰁</span>
          <strong>{{ nextBreakType }}</strong>
        </div>
      </div>

      <div class="progress-track" aria-label="Progreso del bloque actual">
        <div class="progress-fill" :style="{ width: `${progressPercent}%` }"></div>
      </div>

      <div class="button-row">
        <button class="btn btn-darkblue" @click="startTimer" :disabled="isRunning">
          {{ isRunning ? 'En marcha' : 'Iniciar' }}
        </button>
        <button class="btn btn-light border" @click="pauseTimer">Pausar</button>
        <button class="btn btn-light border" @click="resetTimer">Reset</button>
        <button class="btn btn-light border" @click="openMiniWindow">Ventana</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timer-shell {
  padding: 1rem;
}

.timer-card {
  background: linear-gradient(135deg, rgba(205, 180, 219, 0.95), rgba(189, 224, 254, 0.9));
  border-radius: 2rem;
  padding: 1.5rem;
  border: 1px solid rgba(34, 20, 41, 0.08);
  box-shadow: 0 20px 40px rgba(34, 20, 41, 0.12);
}

.timer-header,
.mini-stats,
.button-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.timer-header {
  margin-bottom: 1rem;
}

.timer-badge,
.timer-rounds,
.stat-pill {
  
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.45rem 0.8rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #221429;
}

.timer-display {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(2.6rem, 8vw, 5.2rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #221429;
  text-shadow: 0 8px 24px rgba(34, 20, 41, 0.1);
  font-family: 'Bitcount Prop Single', system-ui, sans-serif;
}

.timer-status {
  text-align: center;
  color: rgba(34, 20, 41, 0.82);
  margin: 0.9rem 0 1.1rem;
  min-height: 3rem;
  font-weight: 600;
}

.mini-stats {
  margin-bottom: 1rem;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding-block: 0.6rem;
  font-size: 0.75rem;
}

.progress-track {
  overflow: hidden;
  height: 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #003566, #a2d2ff);
  transition: width 0.4s ease;
}

.button-row {
  justify-content: center;
}

.btn {
  min-width: 90px;
}
</style>