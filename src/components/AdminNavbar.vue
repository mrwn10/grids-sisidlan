<!-- components/AdminNavbar.vue -->
<template>
  <div class="admin-navbar">
    <div class="nav-links">
      <router-link 
        to="/admin-dashboard" 
        class="nav-link"
        :class="{ active: isActive('/admin-dashboard') }"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
          <path d="M3 9.5L12 3L21 9.5L12 16L3 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M5 11V17L12 21L19 17V11" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
        <span>Dashboard</span>
      </router-link>

      <router-link 
        to="/admin/scan-qr" 
        class="nav-link"
        :class="{ active: isActive('/admin/scan-qr') }"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="5" height="5" stroke="currentColor" stroke-width="1.5" rx="1"/>
          <rect x="16" y="3" width="5" height="5" stroke="currentColor" stroke-width="1.5" rx="1"/>
          <rect x="3" y="16" width="5" height="5" stroke="currentColor" stroke-width="1.5" rx="1"/>
          <rect x="16" y="16" width="5" height="5" stroke="currentColor" stroke-width="1.5" rx="1"/>
          <path d="M8 8L16 16M16 8L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M21 12H3" stroke="currentColor" stroke-width="1.5"/>
          <path d="M12 3V21" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <span>Scan QR Code</span>
      </router-link>

      <!-- Manage Supplies Dropdown -->
      <div class="nav-dropdown" @click.stop="toggleSuppliesDropdown">
        <div 
          class="nav-link"
          :class="{ active: isSuppliesActive() }"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" stroke-width="1.5"/>
            <path d="M12 11h.01M12 15h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Manage Supplies</span>
          <svg class="dropdown-arrow-small" :class="{ 'rotated': isSuppliesDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <!-- Supplies Dropdown Menu -->
        <transition name="dropdown-fade">
          <div v-if="isSuppliesDropdownOpen" class="supplies-dropdown-menu">
            <router-link 
              to="/admin/supplies-request" 
              class="dropdown-item-link"
              :class="{ active: isActive('/admin/supplies-request') }"
              @click="closeSuppliesDropdown"
            >
              <svg class="dropdown-item-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              <span>Supplies Request</span>
            </router-link>
            
            <router-link 
              to="/admin/supplies-in" 
              class="dropdown-item-link"
              :class="{ active: isActive('/admin/supplies-in') }"
              @click="closeSuppliesDropdown"
            >
              <svg class="dropdown-item-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M12 8l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Supplies In</span>
            </router-link>
            
            <router-link 
              to="/admin/supplies-summary" 
              class="dropdown-item-link"
              :class="{ active: isActive('/admin/supplies-summary') }"
              @click="closeSuppliesDropdown"
            >
              <svg class="dropdown-item-icon" viewBox="0 0 24 24" fill="none">
                <path d="M3 3v18h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M18 17V9l-5 5-4-4-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Supplies Summary</span>
            </router-link>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSuppliesDropdownOpen = ref(false)

const isActive = (path) => {
  return route.path === path
}

const isSuppliesActive = () => {
  const suppliesPaths = ['/admin/manage-supplies', '/admin/supplies-request', '/admin/supplies-in', '/admin/supplies-summary']
  return suppliesPaths.includes(route.path)
}

const toggleSuppliesDropdown = () => {
  isSuppliesDropdownOpen.value = !isSuppliesDropdownOpen.value
}

const closeSuppliesDropdown = () => {
  isSuppliesDropdownOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.nav-dropdown')
  if (dropdown && !dropdown.contains(event.target)) {
    isSuppliesDropdownOpen.value = false
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
.admin-navbar {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Manage Supplies Dropdown */
.nav-dropdown {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.dropdown-arrow-small {
  width: 14px;
  height: 14px;
  margin-left: 4px;
  transition: transform 0.2s ease;
}

.dropdown-arrow-small.rotated {
  transform: rotate(180deg);
}

.nav-icon {
  width: 18px;
  height: 18px;
}

.nav-link:hover {
  color: var(--text-primary);
  background: rgba(61, 216, 122, 0.1);
}

.nav-link.active {
  color: #3dd87a;
  background: rgba(61, 216, 122, 0.15);
}

/* Supplies Dropdown Menu */
.supplies-dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  min-width: 200px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
  overflow: hidden;
  z-index: 1001;
  backdrop-filter: blur(10px);
}

.dropdown-item-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.dropdown-item-link:hover {
  background: var(--bg-secondary);
  color: #3dd87a;
}

.dropdown-item-link.active {
  background: rgba(61, 216, 122, 0.1);
  color: #3dd87a;
}

.dropdown-item-icon {
  width: 18px;
  height: 18px;
  color: currentColor;
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

/* Responsive */
@media (max-width: 1024px) {
  .nav-link span {
    display: none;
  }
  
  .nav-link {
    padding: 0.5rem;
  }
  
  .nav-icon {
    width: 20px;
    height: 20px;
  }
  
  .dropdown-arrow-small {
    display: none;
  }
  
  .supplies-dropdown-menu {
    min-width: 180px;
  }
  
  .dropdown-item-link span {
    display: inline;
  }
}

@media (max-width: 768px) {
  .supplies-dropdown-menu {
    min-width: 160px;
  }
  
  .dropdown-item-link {
    padding: 0.6rem 0.75rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .supplies-dropdown-menu {
    min-width: 150px;
  }
  
  .dropdown-item-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .dropdown-item-icon {
    width: 16px;
    height: 16px;
  }
}
</style>