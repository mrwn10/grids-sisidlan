<template>
  <div :class="theme === 'dark' ? 'dark' : ''" class="min-h-screen">
    <div class="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <ThemeToggle :theme="theme" @toggle-theme="toggleTheme" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ThemeToggle from './components/ThemeToggle.vue'

const theme = ref('dark') // Default to dark mode for LoginPage

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.value = savedTheme
  }
})
</script>

<style>
/* Import Space Grotesk font */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Space Grotesk', sans-serif;
}

/* Smooth transitions for theme switching */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>