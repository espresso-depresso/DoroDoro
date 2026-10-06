<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const input = ref('');
const filter = ref('all');
const listas = ref([]);

const getStoredTasks = () => {
  const saved = localStorage.getItem('doro_tasks');
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

const normalizeTask = (task) => ({
  id: task.id || `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  texto: task.texto || '',
  completado: Boolean(task.completado),
  prioridad: task.prioridad || 'normal',
  createdAt: task.createdAt || new Date().toISOString()
});

const resetTasks = () => {
  listas.value = getStoredTasks().map(normalizeTask);
};

const filteredTasks = computed(() => {
  if (filter.value === 'pending') return listas.value.filter((task) => !task.completado);
  if (filter.value === 'done') return listas.value.filter((task) => task.completado);
  return listas.value;
});

const pendingCount = computed(() => listas.value.filter((task) => !task.completado).length);
const completedCount = computed(() => listas.value.filter((task) => task.completado).length);

const agregar = () => {
  const texto = input.value.trim();
  if (!texto) return;

  listas.value.unshift({
    id: `check-${Date.now()}`,
    texto,
    completado: false,
    prioridad: 'normal',
    createdAt: new Date().toISOString()
  });

  input.value = '';
};

const limpiarCompletados = () => {
  listas.value = listas.value.filter((task) => !task.completado);
};

const toggleTask = (taskId) => {
  listas.value = listas.value.map((task) => {
    if (task.id === taskId) return { ...task, completado: !task.completado };
    return task;
  });
};

watch(
  listas,
  (nextList) => {
    localStorage.setItem('doro_tasks', JSON.stringify(nextList));
  },
  { deep: true }
);

onMounted(() => {
  resetTasks();
});
</script>

<template>
  <section class="todo-panel">
    <div class="todo-header">
      <span class="font-bitcount h1 text-darkblue">Lista de tareas</span>
      <div class="todo-stats">
        <span class="stat-badge">{{ pendingCount }} pendientes</span>
        <span class="stat-badge accent">{{ completedCount }} hechas</span>
      </div>
    </div>

    <div class="input-group task-input" style="max-width: 400px;">
      <input
        v-model="input"
        type="text"
        class="form-control"
        @keyup.enter="agregar"
        placeholder="Añade una tarea de estudio..."
      />
      <button type="button" @click="agregar" class="btn btn-darkblue">Añadir</button>
    </div>

    <div class="filter-row" aria-label="Filtrar tareas">
      <button class="filter-chip" :class="{ active: filter === 'all' }" @click="filter = 'all'">Todas</button>
      <button class="filter-chip" :class="{ active: filter === 'pending' }" @click="filter = 'pending'">Pendientes</button>
      <button class="filter-chip" :class="{ active: filter === 'done' }" @click="filter = 'done'">Hechas</button>
      <button class="filter-chip danger" @click="limpiarCompletados">Borrar hechas</button>
    </div>

    <div class="task-list">
      <div
        v-for="tarea in filteredTasks"
        :key="tarea.id"
        class="task-item"
        :class="{ 'is-completed': tarea.completado }"
      >
        <input
          type="checkbox"
          class="form-check-input"
          :id="tarea.id"
          :checked="tarea.completado"
          @change="toggleTask(tarea.id)"
        />

        <label
          class="task-label"
          :class="{ 'is-checked': tarea.completado }"
          :for="tarea.id"
        >
          {{ tarea.texto }}
        </label>
      </div>

      <div v-if="!filteredTasks.length" class="empty-state">
        No hay tareas en esta vista.
      </div>
    </div>
  </section>
</template>

<style scoped>
.todo-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
}

.todo-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.todo-stats {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.stat-badge {
  border-radius: 999px;
  background: rgba(162, 210, 255, 0.25);
  padding: 0.45rem 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #003566;
}

.stat-badge.accent {
  background: rgba(205, 180, 219, 0.4);
  color: #221429;
}

.task-input {
  box-shadow: 0 16px 28px rgba(34, 20, 41, 0.08);
}

.filter-row {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.filter-chip {
  border: none;
  border-radius: 999px;
  padding: 0.45rem 0.8rem;
  background: rgba(255, 255, 255, 0.7);
  color: #221429;
  font-size: 0.75rem;
  font-weight: 600;
}

.filter-chip.active {
  background: #003566;
  color: white;
}

.filter-chip.danger {
  background: #ffe4ea;
  color: #7a1f3d;
}

.task-list {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.9rem 1rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(205, 180, 219, 0.55), rgba(255, 255, 255, 0.4));
  border: 1px solid rgba(34, 20, 41, 0.05);
  box-shadow: 0 10px 18px rgba(34, 20, 41, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 24px rgba(34, 20, 41, 0.08);
}

.task-item.is-completed {
  opacity: 0.78;
  background: rgba(240, 237, 248, 0.8);
}

.task-label {
  font-family: 'Bitcount Prop Single', system-ui, sans-serif;
  font-size: 1.05rem;
  color: #003566;
  width: 100%;
  cursor: pointer;
  transition: color 0.2s ease, text-decoration 0.2s ease;
}

.task-label.is-checked {
  text-decoration: line-through;
  opacity: 0.6;
}

.empty-state {
  text-align: center;
  color: rgba(34, 20, 41, 0.68);
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.4);
}
</style>
