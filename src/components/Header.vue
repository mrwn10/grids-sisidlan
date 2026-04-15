<!-- components/Header.vue -->
<template>
  <header class="dashboard-header" :class="theme">
    <div class="header-left">
      <div class="logo-mark">
        <img :src="logoImage" alt="SISIDLAN Logo" class="logo-image" />
      </div>
      <div class="page-title">
        <h2>{{ currentPageTitle }}</h2>
      </div>
    </div>

    <div class="header-right">z
      
      <!-- Theme Toggle Component -->
      <ThemeToggle 
        :theme="theme" 
        @toggle-theme="handleToggleTheme"
      />
    </div>
  </header>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import logoImage from '@/assets/images/logo.png'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')

const currentPageTitle = computed(() => {
  const titles = {
    '/admin-dashboard': 'Dashboard',
    '/admin/users': 'User Management',
    '/admin/settings': 'Settings',
    '/admin/profile': 'Profile'
  }
  return titles[route.path] || 'Admin Dashboard'
})

const handleToggleTheme = () => {
  if (toggleTheme) {
    toggleTheme()
  }
}
</script>

<style scoped>
.dashboard-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
  background: var(--card-bg);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border-bottom: 1px solid var(--card-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  transition: background 0.3s ease, border-color 0.3s ease;
  z-index: 1000;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-mark {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1f5c2e, #3dd87a);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6px;
  box-shadow: 0 2px 8px rgba(61, 216, 122, 0.25);
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.page-title h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  transition: color 0.3s ease;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-word {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  cursor: default;
}

.nav-word:hover {
  color: var(--text-primary);
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-links {
    gap: 1rem;
  }
  
  .nav-word {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    padding: 0 1rem;
  }
  
  .logo-mark {
    width: 35px;
    height: 35px;
  }
  
  .page-title h2 {
    font-size: 1rem;
  }
  
  .nav-links {
    display: none;
  }
  
  .header-right {
    gap: 1rem;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .dashboard-header {
    padding: 0 0.75rem;
  }
  
  .logo-mark {
    width: 30px;
    height: 30px;
    padding: 4px;
  }
  
  .page-title h2 {
    font-size: 0.9rem;
  }
}
</style>