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

    <div class="header-right">
      <!-- Logout Button -->
      <button @click="handleLogout" class="logout-btn" title="Logout">
        <svg class="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span class="logout-text">Logout</span>
      </button>
      
      <!-- Theme Toggle Component - positioned inline in header -->
      <ThemeToggle 
        :theme="theme" 
        :position="'custom'"
        :custom-top="'0'"
        :custom-right="'0'"
        :fixed="false"
        @toggle-theme="handleToggleTheme"
        class="header-theme-toggle"
      />
    </div>
  </header>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logoImage from '@/assets/images/logo.png'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const router = useRouter()
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

const handleLogout = () => {
  // Clear authentication data from localStorage
  localStorage.removeItem('token')
  localStorage.removeItem('userRole')
  
  // Redirect to login page
  router.push({ name: 'Login' })
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

/* Theme Toggle override styles for header */
.header-theme-toggle {
  position: relative !important;
  width: 40px !important;
  height: 40px !important;
  margin: 0;
  box-shadow: none !important;
}

.header-theme-toggle.dark {
  background: rgba(31, 92, 46, 0.25);
  border: 1px solid rgba(61, 216, 122, 0.3);
}

.header-theme-toggle.light {
  background: rgba(31, 92, 46, 0.08);
  border: 1px solid rgba(31, 92, 46, 0.2);
}

/* Logout Button Styles */
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--bg-secondary);
}

.logout-btn:hover {
  background: rgba(220, 53, 69, 0.1);
  border-color: #dc3545;
  color: #dc3545;
}

.logout-icon {
  width: 18px;
  height: 18px;
}

.logout-text {
  display: inline-block;
}

/* Responsive */
@media (max-width: 1024px) {
  .header-right {
    gap: 1rem;
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
  
  .header-right {
    gap: 0.75rem;
  }
  
  .logout-text {
    display: none;
  }
  
  .logout-btn {
    padding: 0.5rem;
  }
  
  .header-theme-toggle {
    width: 36px !important;
    height: 36px !important;
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
  
  .logout-btn {
    padding: 0.4rem;
  }
  
  .header-theme-toggle {
    width: 34px !important;
    height: 34px !important;
  }
  
  .header-theme-toggle svg {
    width: 14px !important;
    height: 14px !important;
  }
}
</style>