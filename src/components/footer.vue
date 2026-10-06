<script setup>
</script>

<template>
  <footer class="site-footer">
    <nav class="navbar">
      <div class="container-fluid">
        <a class="navbar-brand justify-content-start font-bitcount brand-name" href="#">DoroDoro</a>
        <ul class="nav justify-content-end gap-2">
          <li class="nav-item p-2">
            <RouterLink :to="{ hash: '#info' }" class="nav-link footer-link">Inicio</RouterLink>
          </li>
          <li class="nav-item p-2">
            <RouterLink to="/app" class="nav-link footer-link">Modo estudio</RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <div class="social-row">
      <a href="https://github.com/espresso-depresso" target="_blank" class="social-link" aria-label="GitHub">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.84 9.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.16-3.37-1.16-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.45 9.45 0 0 1 12 6.84a9.45 9.45 0 0 1 2.5.34c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.41.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.93.68 1.88v2.79c0 .27.18.58.69.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z"/></svg>
      </a>

      <a href="https://www.instagram.com/yofknangel_ale/" target="_blank" class="social-link" aria-label="Instagram">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5-3.3a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2Z"/></svg>
      </a>
    </div>

    <div class="footer-copy">
      <p class="font-bitcount mb-0">@DoroDoro 2026. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: rgba(255, 200, 221, 0.75);
  padding-bottom: 1rem;
}

.brand-name {
  color: #221429;
  font-size: clamp(1.2rem, 2vw, 1.7rem);
}

.footer-link {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);
  color: #221429;
  text-decoration: none;
}

.social-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  padding: 0.7rem 0;
  color: #221429;
}

.social-link {
  color: #221429;
}

.footer-copy {
  text-align: center;
  padding: 0.5rem 1rem 0;
  color: rgba(34, 20, 41, 0.78);
}
</style>
