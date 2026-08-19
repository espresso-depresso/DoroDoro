<script setup>
import { onMounted, onUnmounted } from 'vue';

defineProps({
  isOpen: {
    type: Boolean, 
    required: true
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const handleKeydown = (e) => {
  if (e.key === 'Escape') closeModal();
};

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-right">
      <div 
        v-if="isOpen" 
        class="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end" 
        @click="closeModal">
        <div class="modal-sidebar bg-light p-3 d-flex flex-column h-100" @click.stop>
          
          <div class="d-flex justify-content-end">
            <button class="btn-close fs-4 border-0 bg-skyblue" @click="closeModal"></button>
          </div>
          
          <header class="modal-header border-bottom pb-2 mb-3">
            <slot name="header"></slot>
          </header>

          <main class="modal-body flex-grow-1 overflow-auto">
            <slot name="body"></slot>
          </main>

          <footer class="modal-footer pt-2 mt-3 d-flex justify-content-center">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  background-color: rgba(122, 147, 165, 0.5);
  z-index: 1050;
}

.modal-sidebar {
  width: 100%;
  max-width: 300px; 
  box-shadow: -5px 0 15px rgba(122, 147, 165, 0.5);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.3s ease;
}

.slide-right-enter-active .modal-sidebar,
.slide-right-leave-active .modal-sidebar {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
}

.slide-right-enter-from .modal-sidebar,
.slide-right-leave-to .modal-sidebar {
  transform: translateX(100%);
}
</style>
