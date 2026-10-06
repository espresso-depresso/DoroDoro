<script setup>
import { onMounted, ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import { useHead } from '@unhead/vue'


useHead({
  title: 'DoroDoro - Pomodoro Timer',
  meta: [
    { 
      name: 'description', 
      content: 'Timer Pomodoro para mejorar la productividad y el enfoque.' 
    },
    { property: 'og:title', content: 'DoroDoro - Pomodoro Timer' },
    { property: 'og:description', content: 'Timer Pomodoro para mejorar la productividad y el enfoque.' },
  ]
})

const isDarkMode = ref(localStorage.getItem('doro_theme') === 'dark');

const applyTheme = (darkMode) => {
  document.body.classList.toggle('theme-dark', darkMode);
  document.body.dataset.theme = darkMode ? 'dark' : 'light';
  localStorage.setItem('doro_theme', darkMode ? 'dark' : 'light');
};

watch(isDarkMode, (value) => applyTheme(value), { immediate: true });

onMounted(() => {
  window.addEventListener('theme-change', (event) => {
    isDarkMode.value = Boolean(event.detail);
  });
});
</script>

<template>
  <div class="app-shell">
    <RouterView />
  </div>
</template>

<style>
:root {
  --bg-page: #f6f1ff;
  --bg-surface: rgba(255, 255, 255, 0.68);
  --bg-card: rgba(255, 255, 255, 0.82);
  --bg-soft: rgba(205, 180, 219, 0.38);
  --text-primary: #221429;
  --text-secondary: rgba(34, 20, 41, 0.75);
  --border-soft: rgba(34, 20, 41, 0.08);
  --button-primary: #003566;
  --button-primary-text: #ffffff;
}

body.theme-dark {
  --bg-page: #0d1220;
  --bg-surface: rgba(18, 26, 38, 0.8);
  --bg-card: rgba(24, 34, 49, 0.9);
  --bg-soft: rgba(117, 152, 197, 0.18);
  --text-primary: #eef5ff;
  --text-secondary: rgba(238, 245, 255, 0.8);
  --border-soft: rgba(255, 255, 255, 0.08);
  --button-primary: #7ec8ff;
  --button-primary-text: #06111c;
}

body {
  margin: 0;
  background-color: var(--bg-page) !important;
  background-image: radial-gradient(circle at top, rgba(205, 180, 219, 0.28), transparent 30%);
  color: var(--text-primary);
  transition: background-color 0.25s ease, color 0.25s ease;
}

*, *::before, *::after {
  cursor: url('/DoroDoro/Corky Select.cur'), auto !important;
}

#app {
  min-height: 100vh;
}

.app-shell {
  min-height: 100vh;
  background: transparent;
  color: var(--text-primary);
}

body.theme-dark .bg-lightpink,
body.theme-dark .site-footer,
body.theme-dark .top-nav {
  background: rgba(19, 25, 36, 0.94) !important;
}

body.theme-dark .bg-pastelpurple,
body.theme-dark .timer-card,
body.theme-dark .task-item,
body.theme-dark .info-card {
  background: linear-gradient(135deg, rgba(59, 76, 104, 0.9), rgba(25, 38, 52, 0.95)) !important;
}

body.theme-dark .text-darkpurple,
body.theme-dark .text-darkblue,
body.theme-dark .brand-name,
body.theme-dark .action-pill,
body.theme-dark .footer-link,
body.theme-dark .social-link,
body.theme-dark .title-main,
body.theme-dark .lead-text,
body.theme-dark .secondary-text {
  color: var(--text-primary) !important;
}

body.theme-dark .stat-badge,
body.theme-dark .filter-chip,
body.theme-dark .preset-btn,
body.theme-dark .timer-badge,
body.theme-dark .timer-rounds,
body.theme-dark .stat-pill,
body.theme-dark .action-pill,
body.theme-dark .footer-link {
  background: rgba(31, 44, 62, 0.9) !important;
  color: var(--text-primary) !important;
}

body.theme-dark .btn-darkblue {
  background-color: var(--button-primary) !important;
  border-color: var(--button-primary) !important;
  color: var(--button-primary-text) !important;
}

body.theme-dark .modal-sidebar {
  background: #141d2b !important;
  color: var(--text-primary) !important;
}

body.theme-dark .form-control,
body.theme-dark .form-range {
  background: rgba(15, 22, 32, 0.9);
  color: #edf5ff;
  border-color: rgba(255, 255, 255, 0.12);
}

body.theme-dark .form-check-input {
  accent-color: #7ec8ff;
}

body.theme-dark .task-label,
body.theme-dark .mood-indicator,
body.theme-dark .timer-status,
body.theme-dark .settings-output,
body.theme-dark .brand-name,
body.theme-dark .footer-copy {
  color: var(--text-primary) !important;
}
</style>
