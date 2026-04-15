<!-- components/Header.vue -->
<template>
  <header class="dashboard-header" :class="theme">
    <div class="header-left">
      <button class="menu-toggle" @click="toggleMobileMenu">
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="logo-mark">
        <img :src="logoImage" alt="SISIDLAN Logo" class="logo-image" />
      </div>
      <div class="page-title">
        <h2>{{ currentPageTitle }}</h2>
      </div>
    </div>

    <div class="header-right">
      <div class="theme-toggle" @click="toggleTheme">
        <svg v-if="theme === 'dark'" viewBox="0 0 20 20" fill="none">
          <path d="M10 2V4M10 16V18M4 10H2M6.5 6.5L5 5M13.5 13.5L15 15M18 10H16M13.5 6.5L15 5M6.5 13.5L5 15M10 6C12.2091 6 14 7.79086 14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6Z" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <svg v-else viewBox="0 0 20 20" fill="none">
          <path d="M17 12.5C16.5 15 14.5 17 12 17.5C9.5 18 7 16.5 5.5 14.5C4 12.5 3.5 9.5 5 7C5.5 5.5 7 4 8.5 3.5C8 5 8 7 9 8.5C10 10 12 10.5 13.5 9.5C13 11 12.5 12 11.5 12.5C13.5 12 15.5 12.5 17 12.5Z" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </div>

      <div class="user-menu" @click="toggleUserDropdown">
        <div class="avatar">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M3 18V16C3 13.7909 4.79086 12 7 12H13C15.2091 12 17 13.7909 17 16V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="user-name">Administrator</span>
        <svg class="dropdown-icon" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>

        <transition name="fade">
          <div v-if="userDropdownOpen" class="dropdown-menu">
            <div class="dropdown-item" @click="handleProfile">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" stroke="currentColor" stroke-width="1.2"/>
                <path d="M3 14V12C3 9.79086 4.79086 8 7 8H9C11.2091 8 13 9.79086 13 12V14" stroke="currentColor" stroke-width="1.2"/>
              </svg>
              <span>Profile</span>
            </div>
            <div class="dropdown-item" @click="handleSettings">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" stroke-width="1.2"/>
                <path d="M12.5 6.5L13.5 5.5M13.5 10.5L12.5 9.5M3.5 9.5L2.5 10.5M2.5 5.5L3.5 6.5M10 2L8 2.5L6 2M2 6L2.5 8L2 10M14 10L13.5 8L14 6M10 14L8 13.5L6 14M6 2L8 2.5L10 2" stroke="currentColor" stroke-width="1.2"/>
              </svg>
              <span>Settings</span>
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item logout-item" @click="handleLogout">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M10 2.5H12C12.5523 2.5 13 2.94772 13 3.5V12.5C13 13.0523 12.5523 13.5 12 13.5H10M6 11L3 8L6 5M3 8H10" stroke="currentColor" stroke-width="1.2"/>
              </svg>
              <span>Logout</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoImage from '@/assets/images/logo.png'

const props = defineProps({
  toggleSidebar: {
    type: Function,
    required: true
  }
})

const router = useRouter()
const route = useRoute()
const theme = inject('theme')
const userDropdownOpen = ref(false)

const currentPageTitle = computed(() => {
  const titles = {
    '/admin-dashboard': 'Dashboard',
    '/admin/users': 'User Management',
    '/admin/settings': 'Settings'
  }
  return titles[route.path] || 'Admin Dashboard'
})

const toggleMobileMenu = () => {
  props.toggleSidebar()
}

const toggleTheme = () => {
  const newTheme = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.classList.remove(theme.value)
  document.documentElement.classList.add(newTheme)
  localStorage.setItem('theme', newTheme)
  theme.value = newTheme
}

const toggleUserDropdown = () => {
  userDropdownOpen.value = !userDropdownOpen.value
}

const handleProfile = () => {
  userDropdownOpen.value = false
  router.push('/admin/profile')
}

const handleSettings = () => {
  userDropdownOpen.value = false
  router.push('/admin/settings')
}

const handleLogout = () => {
  userDropdownOpen.value = false
  localStorage.removeItem('token')
  localStorage.removeItem('userRole')
  router.push('/')
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const userMenu = document.querySelector('.user-menu')
  if (userMenu && !userMenu.contains(event.target)) {
    userDropdownOpen.value = false
  }
}

document.addEventListener('click', handleClickOutside)
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
  transition: left 0.3s ease;
  z-index: 999;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  display: none;
  background: var(--stat-bg);
  border: 1px solid var(--stat-border);
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-toggle:hover {
  background: var(--stat-hover-bg);
}

.menu-toggle svg {
  width: 20px;
  height: 20px;
  color: var(--text-primary);
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
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.theme-toggle {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--stat-bg);
  border: 1px solid var(--stat-border);
  cursor: pointer;
  transition: all 0.2s;
}

.theme-toggle:hover {
  background: var(--stat-hover-bg);
}

.theme-toggle svg {
  width: 18px;
  height: 18px;
  color: var(--text-primary);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
  transition: background 0.2s;
  position: relative;
}

.user-menu:hover {
  background: var(--stat-bg);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1f5c2e, #3dd87a);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar svg {
  width: 20px;
  height: 20px;
  color: white;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.dropdown-icon {
  width: 14px;
  height: 14px;
  color: var(--text-muted);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 200px;
  background: var(--card-bg);
  backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: var(--card-shadow);
  z-index: 1000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-secondary);
}

.dropdown-item:hover {
  background: var(--stat-bg);
  color: var(--text-primary);
}

.dropdown-item svg {
  width: 16px;
  height: 16px;
}

.dropdown-divider {
  height: 1px;
  background: var(--card-border);
  margin: 0.5rem 0;
}

.logout-item {
  color: #e8a020;
}

.logout-item:hover {
  background: rgba(232, 160, 32, 0.1);
  color: #e8a020;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-header {
    padding: 0 1rem;
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .logo-mark {
    display: none;
  }
  
  .user-name,
  .dropdown-icon {
    display: none;
  }
}
</style>