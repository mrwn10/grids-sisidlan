import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import ScanQR from '../views/admin/ScanQR.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/scan-qr',
    name: 'ScanQR',
    component: ScanQR,
    meta: { requiresAuth: true, role: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication and role-based access
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('userRole')

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!token) {
      // Not authenticated, redirect to login
      next({ name: 'Login' })
    } else if (to.meta.role && to.meta.role !== userRole) {
      // Authenticated but wrong role, redirect to login
      next({ name: 'Login' })
    } else {
      // Authenticated and authorized
      next()
    }
  } else {
    // If already logged in and trying to access login page, redirect to admin dashboard
    if (to.name === 'Login' && token && userRole === 'admin') {
      next({ name: 'AdminDashboard' })
    } else {
      next()
    }
  }
})

export default router