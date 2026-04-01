<!-- components/Sidebar.vue -->
<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <div class="logo-wrapper" @click="toggleSidebar">
        <img :src="logoImage" alt="SISIDLAN Logo" class="sidebar-logo" />
        <span v-if="!isCollapsed" class="logo-text">SISIDLAN</span>
      </div>
      <button class="toggle-btn" @click="toggleSidebar">
        <svg viewBox="0 0 20 20" fill="none">
          <path v-if="!isCollapsed" d="M13 5L8 10L13 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path v-else d="M7 5L12 10L7 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <p v-if="!isCollapsed" class="nav-label">Main</p>
        <router-link to="/admin-dashboard" class="nav-item" :class="{ active: isActive('/admin-dashboard') }">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M3 10L10 3L17 10L14 13L10 17L6 13L3 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 10H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M10 8V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span v-if="!isCollapsed">Dashboard</span>
        </router-link>

        <router-link to="/admin/users" class="nav-item" :class="{ active: isActive('/admin/users') }">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M3 18V16C3 13.7909 4.79086 12 7 12H13C15.2091 12 17 13.7909 17 16V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span v-if="!isCollapsed">Users</span>
        </router-link>

        <router-link to="/admin/settings" class="nav-item" :class="{ active: isActive('/admin/settings') }">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M15.5 6.5L16.5 5.5M16.5 14.5L15.5 13.5M4.5 13.5L3.5 14.5M3.5 5.5L4.5 6.5M13 2.5L10 3L7 2.5M2.5 7L3 10L2.5 13M17.5 13L17 10L17.5 7M13 17.5L10 17L7 17.5M7 2.5L10 3L13 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span v-if="!isCollapsed">Settings</span>
        </router-link>
      </div>

      <div class="nav-section">
        <p v-if="!isCollapsed" class="nav-label">System</p>
        <button @click="handleLogout" class="nav-item logout-item">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M13 3h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-3M8 15l-4-4 4-4M4 11h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoImage from '@/assets/images/logo.png'

const router = useRouter()
const route = useRoute()
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const isActive = (path) => {
  return route.path === path
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userRole')
  router.push('/')
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 260px;
  background: var(--card-bg);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border-right: 1px solid var(--card-border);
  transition: width 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--card-border);
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  overflow: hidden;
}

.sidebar-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-primary);
  white-space: nowrap;
}

.toggle-btn {
  background: var(--stat-bg);
  border: 1px solid var(--stat-border);
  border-radius: 8px;
  padding: 0.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.toggle-btn:hover {
  background: var(--stat-hover-bg);
  border-color: rgba(61, 216, 122, 0.4);
}

.toggle-btn svg {
  width: 16px;
  height: 16px;
  color: var(--text-primary);
}

.sidebar-nav {
  padding: 1.5rem;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  white-space: nowrap;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  width: 100%;
  background: transparent;
  border: none;
  font-size: 0.9rem;
  font-family: inherit;
}

.nav-item:hover {
  background: var(--stat-bg);
  color: var(--text-primary);
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(31, 92, 46, 0.2), rgba(61, 216, 122, 0.2));
  color: #3dd87a;
  border-left: 2px solid #3dd87a;
}

.logout-item {
  color: #e8a020;
}

.logout-item:hover {
  background: rgba(232, 160, 32, 0.1);
  color: #e8a020;
}

.nav-item svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.sidebar.collapsed .nav-item span,
.sidebar.collapsed .nav-label {
  display: none;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 0.75rem;
}

.sidebar.collapsed .nav-item svg {
  margin: 0;
}

/* Scrollbar styling */
.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: var(--card-border);
}

.sidebar::-webkit-scrollbar-thumb {
  background: #3dd87a;
  border-radius: 4px;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
}
</style>