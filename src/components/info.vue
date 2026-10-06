<script setup>
</script>

<template>
  <div class="container py-4 info-wrapper">
    <header class="mb-4 pb-3 border-bottom border-pastelpurple">
      <h1 class="font-bitcount fw-semibold mb-3 title-main">¡Bienvenido a DoroDoro!</h1>
      <p class="lead-text">
        DoroDoro es tu compañero pequeño para estudiar con mayor enfoque, organizar tareas y mantener un ritmo sano de trabajo y descanso.
      </p>
    </header>

    <p class="mb-4 lead-text">
      <span class="fw-semibold fs-5 font-bitcount">¿Por qué usar DoroDoro?</span>
      Porque convierte el estudio en bloques claros, reduciendo la procrastinación y ayudándote a avanzar sin sentirte abrumado.
      Puedes empezar, pausar, reiniciar, seguir ciclos de enfoque y tomar descansos inteligentes.
    </p>

    <section class="card info-card border-0 p-4 mb-4">
      <h2 class="font-bitcount fw-semibold h3 mb-3 title-main">¿Qué es la técnica Pomodoro?</h2>
      <p class="mb-3 lead-text">
        Es una técnica de gestión del tiempo que divide el trabajo en bloques cortos y enfocados, alternados con descansos breves.
        Así puedes estudiar mejor sin agotar la atención ni la energía mental.
      </p>
      <p class="mb-0 secondary-text">
        Funciona porque tu cerebro suele rendir mejor en ciclos sostenibles, no en horas interminables de esfuerzo continuo.
      </p>
    </section>

    <section>
      <h2 class="font-bitcount fw-semibold h3 mb-3 title-main">Cómo usar DoroDoro</h2>
      <ul class="ps-3 d-flex justify-content-between flex-column border-skyblue list-group">
        <li class="list-group-item mb-2 ps-2">
          <span class="badge bg-pastelpurple badge-pill">1</span>
          Define un bloque de estudio y activa el temporizador.
        </li>
        <li class="list-group-item mb-2 ps-2">
          <span class="badge bg-pastelpurple badge-pill">2</span>
          Trabaja en una sola tarea sin distraerte, como si fuera un sprint de enfoque.
        </li>
        <li class="mb-2 list-group-item ps-2">
          <span class="badge bg-pastelpurple badge-pill">3</span>
          Cuando termine, toma un descanso breve para recuperar claridad.
        </li>
        <li class="mb-2 list-group-item ps-2">
          <span class="badge bg-pastelpurple badge-pill">4</span>
          Repite ciclos para lograr más progreso con menos cansancio mental.
        </li>
        <li class="mb-2 list-group-item ps-2">
          <span class="badge bg-pastelpurple badge-pill">5</span>
          Usa la lista de tareas para organizar lo que debes estudiar y marcar lo que ya avanzaste.
        </li>
        <li class="mb-0 list-group-item ps-2">
          <span class="badge bg-pastelpurple badge-pill">6</span>
          Busca música para crear el ambiente perfecto: calma, foco o energía.
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.info-wrapper {
  color: var(--text-primary);
}

.title-main {
  color: var(--text-primary);
}

.lead-text,
.secondary-text {
  color: var(--text-secondary);
}

.info-card {
  background: rgba(205, 180, 219, 0.2);
  border: 1px solid var(--border-soft);
}
</style>

