<template>
  <div :class="theme === 'dark' ? 'dark' : 'light'" class="login-container-wrapper">
    <div class="min-h-screen">
      <ThemeToggle :theme="theme" @toggle-theme="toggleTheme" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import ThemeToggle from './components/ThemeToggle.vue'

// Global theme state
const theme = ref('dark')

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', theme.value)
}

// Initialize theme from localStorage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
    theme.value = savedTheme
  }
})

// Provide theme to all child components
provide('theme', theme)
</script>

<style>
/* Global styles that apply to all components */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  overflow-x: hidden;
}

.login-container-wrapper {
  min-height: 100vh;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>