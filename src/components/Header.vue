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
      <!-- Admin Navbar Component -->
      <AdminNavbar />

      <!-- Profile Dropdown -->
      <div class="profile-dropdown" @click.stop="toggleDropdown">
        <div class="profile-icon">
          <span class="profile-initials">AG</span>
        </div>
        <svg class="dropdown-arrow" :class="{ 'rotated': isDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        
        <!-- Dropdown Menu -->
        <transition name="dropdown-fade">
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <div class="dropdown-header">
              <div class="dropdown-profile-icon">
                <span class="dropdown-initials">AG</span>
              </div>
              <div class="dropdown-user-info">
                <div class="user-name">Admin</div>
                <div class="user-role">Sisidlan Grids</div>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <button @click="handleLogout" class="dropdown-item logout-item">
              <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </transition>
      </div>
      
      <!-- Theme Toggle Component -->
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
import { computed, inject, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logoImage from '@/assets/images/logo.png'
import ThemeToggle from './ThemeToggle.vue'
import AdminNavbar from './AdminNavbar.vue'

const route = useRoute()
const router = useRouter()
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')

const isDropdownOpen = ref(false)

const currentPageTitle = computed(() => {
  const titles = {
    '/admin-dashboard': 'Dashboard',
    '/admin/scan-qr': 'Scan QR Code',
    '/admin/manage-supplies': 'Manage Supplies',
    '/admin/supplies-request': 'Supplies Request',
    '/admin/supplies-in': 'Supplies In',
    '/admin/supplies-summary': 'Supplies Summary',
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

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleLogout = () => {
  // Clear authentication data from localStorage
  localStorage.removeItem('token')
  localStorage.removeItem('userRole')
  
  // Redirect to login page
  router.push({ name: 'Login' })
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.profile-dropdown')
  if (dropdown && !dropdown.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
  gap: 1.5rem;
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
  white-space: nowrap;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Profile Dropdown Styles */
.profile-dropdown {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem 0.25rem 0.25rem;
  border-radius: 40px;
  background: var(--bg-secondary);
  border: 1px solid var(--card-border);
  transition: all 0.2s ease;
}

.profile-dropdown:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary-color);
}

.profile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1f5c2e, #3dd87a);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-initials {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.dropdown-arrow {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 260px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
  overflow: hidden;
  z-index: 1001;
  backdrop-filter: blur(10px);
}

.dropdown-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--bg-secondary);
}

.dropdown-profile-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1f5c2e, #3dd87a);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
}

.dropdown-initials {
  font-weight: 600;
}

.dropdown-user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.user-role {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.dropdown-divider {
  height: 1px;
  background: var(--card-border);
  margin: 0;
}

.dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background: var(--bg-secondary);
}

.logout-item {
  color: #dc3545;
}

.logout-item:hover {
  background: rgba(220, 53, 69, 0.1);
}

.dropdown-icon {
  width: 18px;
  height: 18px;
}

/* Dropdown Animation */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Theme Toggle Styles */
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

/* Responsive */
@media (max-width: 1200px) {
  .header-left {
    gap: 1rem;
  }
  
  .page-title h2 {
    font-size: 1rem;
  }
}

@media (max-width: 1024px) {
  .header-left {
    gap: 0.75rem;
  }
  
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
  
  .page-title {
    display: none;
  }
  
  .header-left {
    gap: 0.5rem;
  }
  
  .header-right {
    gap: 0.75rem;
  }
  
  .profile-dropdown {
    padding: 0.25rem 0.5rem 0.25rem 0.25rem;
  }
  
  .profile-icon {
    width: 35px;
    height: 35px;
    font-size: 0.875rem;
  }
  
  .dropdown-arrow {
    width: 14px;
    height: 14px;
  }
  
  .dropdown-menu {
    min-width: 240px;
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
  
  .profile-icon {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
  
  .profile-dropdown {
    padding: 0.2rem 0.4rem 0.2rem 0.2rem;
  }
  
  .dropdown-arrow {
    width: 12px;
    height: 12px;
  }
  
  .dropdown-menu {
    min-width: 220px;
  }
  
  .dropdown-profile-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .user-name {
    font-size: 0.85rem;
  }
  
  .user-role {
    font-size: 0.7rem;
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