<template>
  <div class="login-container" :class="theme">
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="bg-orb orb-3"></div>

    <!-- Theme Toggle - Now outside login-card, positioned globally -->
    <div class="theme-toggle-global">
      <ThemeToggle :theme="theme" @toggle-theme="toggleTheme" />
    </div>

    <div class="login-card">
      <div class="card-grid"></div>

      <div class="login-header">
        <div class="logo-mark">
          <img :src="logoImage" alt="SISIDLAN Logo" class="logo-image" />
        </div>
        <h1>SISIDLAN</h1>
        <p class="subtitle">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group" :class="{ focused: focusedField === 'email' }">
          <label for="email">
            <svg class="field-icon" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 6.5L10 11L17.5 6.5M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            required 
            placeholder="you@example.com"
            autocomplete="email" 
            @focus="focusedField = 'email'" 
            @blur="focusedField = null"
          >
          <div class="field-line"></div>
        </div>

        <div class="form-group" :class="{ focused: focusedField === 'password' }">
          <label for="password">
            <svg class="field-icon" viewBox="0 0 20 20" fill="none">
              <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" stroke-width="1.5" />
              <path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <circle cx="10" cy="13.5" r="1.25" fill="currentColor" />
            </svg>
            Password
          </label>
          <div class="input-wrapper">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="form.password" 
              required
              placeholder="••••••••" 
              autocomplete="current-password" 
              @focus="focusedField = 'password'"
              @blur="focusedField = null"
            >
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" viewBox="0 0 20 20" fill="none">
                <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" stroke-width="1.5" />
                <circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5" />
              </svg>
              <svg v-else viewBox="0 0 20 20" fill="none">
                <path d="M3 3l14 14M8.5 8.5A2.5 2.5 0 0112 12M5.3 5.3C3.7 6.5 2.5 8 2 10c1.3 3.4 4.5 6 8 6 1.5 0 2.9-.4 4.1-1.1M9 4.1C9.3 4 9.7 4 10 4c3.5 0 6.7 2.6 8 6-.4 1-.9 1.9-1.6 2.7"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div class="field-line"></div>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span class="btn-text" v-if="!loading">
            Sign In
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </span>
          <span class="btn-loader" v-else>
            <span></span><span></span><span></span>
          </span>
        </button>

        <transition name="fade">
          <div v-if="error" class="error-message">
            <svg viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" />
              <path d="M10 6v5M10 13.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            {{ error }}
          </div>
        </transition>
      </form>

      <div class="demo-notes">
        <div class="notes-divider"><span>Demo Credentials</span></div>
        <div class="credentials">
          <div class="credential-item" @click="setCredentials('admin@example.com', 'password')">
            <span class="badge admin-badge">Admin</span>
            <div class="cred-info">
              <span class="cred-email">admin@example.com</span>
              <span class="cred-pass">password</span>
            </div>
            <svg class="cred-arrow" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <div class="credential-item" @click="setCredentials('user@example.com', 'password')">
            <span class="badge user-badge">User</span>
            <div class="cred-info">
              <span class="cred-email">user@example.com</span>
              <span class="cred-pass">password</span>
            </div>
            <svg class="cred-arrow" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Screen Component -->
    <LoadingScreen 
      :visible="loading" 
      message="Authenticating your credentials..."
      :progress="loadingProgress"
    />
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import LoadingScreen from '@/components/LoadingScreen.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import logoImage from '@/assets/images/logo.png'

// Inject global theme from App.vue
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')

const router = useRouter()
const form = ref({ email: '', password: '' })
const loading = ref(false)
const loadingProgress = ref(0)
const error = ref(null)
const focusedField = ref(null)
const showPassword = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  loadingProgress.value = 0
  
  // Simulate progress animation
  let progress = 0
  const interval = setInterval(() => {
    progress += 10
    loadingProgress.value = Math.min(progress, 90)
    if (progress >= 90) clearInterval(interval)
  }, 150)
  
  // Simulate API call
  await new Promise(r => setTimeout(r, 2000))
  
  clearInterval(interval)
  loadingProgress.value = 100
  
  try {
    if (form.value.email === 'admin@example.com' && form.value.password === 'password') {
      localStorage.setItem('token', 'demo-token')
      localStorage.setItem('userRole', 'admin')
      setTimeout(() => {
        loading.value = false
        router.push('/admin-dashboard')
      }, 300)
    } else if (form.value.email === 'user@example.com' && form.value.password === 'password') {
      localStorage.setItem('token', 'demo-token')
      localStorage.setItem('userRole', 'user')
      setTimeout(() => {
        loading.value = false
        router.push('/user-dashboard')
      }, 300)
    } else {
      throw new Error('Invalid email or password. Please try again.')
    }
  } catch (err) {
    error.value = err.message || 'Login failed. Please try again.'
    loading.value = false
    loadingProgress.value = 0
  }
}

const setCredentials = (email, password) => {
  form.value.email = email
  form.value.password = password
}
</script>

<style scoped>
/* CSS VARIABLES remain the same as before */
.dark {
  --bg: #0e160f;
  --orb1: rgba(31, 92, 46, 0.5);
  --orb2: rgba(232, 160, 32, 0.18);
  --orb3: rgba(61, 216, 122, 0.15);
  --card-bg: rgba(18, 38, 20, 0.60);
  --card-border: rgba(61, 216, 122, 0.15);
  --card-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.75), 0 0 80px rgba(31, 92, 46, 0.18);
  --card-inset: rgba(61, 216, 122, 0.05);
  --grid-line: rgba(61, 216, 122, 0.03);
  --text-primary: #edfff3;
  --text-secondary: rgba(237, 255, 243, 0.38);
  --text-muted: rgba(237, 255, 243, 0.20);
  --input-bg: rgba(31, 92, 46, 0.22);
  --input-border: rgba(61, 216, 122, 0.14);
  --input-focus-bg: rgba(31, 92, 46, 0.32);
  --input-focus-bdr: rgba(61, 216, 122, 0.40);
  --input-focus-shd: rgba(61, 216, 122, 0.09);
  --divider: rgba(61, 216, 122, 0.10);
  --divider-bg: #131f14;
  --cred-bg: rgba(31, 92, 46, 0.18);
  --cred-border: rgba(61, 216, 122, 0.10);
  --cred-hover-bg: rgba(31, 92, 46, 0.30);
  --cred-hover-bdr: rgba(61, 216, 122, 0.22);
  --toggle-bg: rgba(31, 92, 46, 0.35);
  --toggle-border: rgba(61, 216, 122, 0.2);
  --toggle-color: #3dd87a;
  --toggle-hover: rgba(31, 92, 46, 0.55);
}

.light {
  --bg: #f0faf2;
  --orb1: rgba(31, 92, 46, 0.12);
  --orb2: rgba(232, 160, 32, 0.14);
  --orb3: rgba(61, 216, 122, 0.18);
  --card-bg: rgba(255, 255, 255, 0.70);
  --card-border: rgba(31, 92, 46, 0.15);
  --card-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.12), 0 0 60px rgba(61, 216, 122, 0.08);
  --card-inset: rgba(255, 255, 255, 0.8);
  --grid-line: rgba(31, 92, 46, 0.04);
  --text-primary: #1a3d20;
  --text-secondary: rgba(26, 61, 32, 0.55);
  --text-muted: rgba(26, 61, 32, 0.35);
  --input-bg: rgba(237, 255, 243, 0.7);
  --input-border: rgba(31, 92, 46, 0.18);
  --input-focus-bg: rgba(237, 255, 243, 0.95);
  --input-focus-bdr: rgba(61, 216, 122, 0.55);
  --input-focus-shd: rgba(61, 216, 122, 0.12);
  --divider: rgba(31, 92, 46, 0.12);
  --divider-bg: #f0faf2;
  --cred-bg: rgba(237, 255, 243, 0.6);
  --cred-border: rgba(31, 92, 46, 0.12);
  --cred-hover-bg: rgba(237, 255, 243, 0.95);
  --cred-hover-bdr: rgba(61, 216, 122, 0.35);
  --toggle-bg: rgba(255, 255, 255, 0.8);
  --toggle-border: rgba(31, 92, 46, 0.2);
  --toggle-color: #1f5c2e;
  --toggle-hover: rgba(237, 255, 243, 0.95);
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: var(--bg);
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease;
}

/* Global Theme Toggle - positioned relative to the page */
.theme-toggle-global {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
}

/* Orbs */
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  transition: background 0.4s ease;
}

.orb-1 {
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, var(--orb1), transparent 70%);
  top: -150px;
  left: -130px;
  animation: float1 9s ease-in-out infinite;
}

.orb-2 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, var(--orb2), transparent 70%);
  bottom: -110px;
  right: -90px;
  animation: float2 11s ease-in-out infinite;
}

.orb-3 {
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, var(--orb3), transparent 70%);
  top: 42%;
  left: 60%;
  animation: float3 8s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  40% {
    transform: translate(22px, -22px) scale(1.04);
  }
  70% {
    transform: translate(-14px, 14px) scale(0.97);
  }
}

@keyframes float2 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  35% {
    transform: translate(-18px, 18px) scale(1.05);
  }
  70% {
    transform: translate(12px, -12px) scale(0.98);
  }
}

@keyframes float3 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  40% {
    transform: translate(14px, -14px) scale(1.03);
  }
  70% {
    transform: translate(-9px, 9px) scale(0.97);
  }
}

/* Glass Card */
.login-card {
  position: relative;
  background: var(--card-bg);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 2.5rem 2.25rem;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--card-shadow), 0 0 0 1px var(--card-inset) inset;
  overflow: hidden;
  transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
}

.card-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  border-radius: inherit;
}

/* Header */
.login-header {
  text-align: center;
  margin-bottom: 2.25rem;
}

.logo-mark {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #1f5c2e, #3dd87a);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  box-shadow: 0 8px 28px rgba(61, 216, 122, 0.35), 0 0 0 1px rgba(237, 255, 243, 0.1) inset;
  overflow: hidden;
  padding: 12px;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.login-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 5px;
  color: var(--text-primary);
  text-shadow: 0 0 40px rgba(61, 216, 122, 0.2);
  margin-bottom: 0.4rem;
  transition: color 0.3s;
}

.subtitle {
  font-size: 0.82rem;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
  transition: color 0.3s;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  position: relative;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.55rem;
  transition: color 0.2s;
}

.form-group.focused label {
  color: #3dd87a;
}

.field-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.input-wrapper {
  position: relative;
}

.form-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 0.92rem;
  outline: none;
  font-family: inherit;
  transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, color 0.3s;
}

.input-wrapper input {
  padding-right: 3rem;
}

.form-group input::placeholder {
  color: var(--text-muted);
}

.form-group.focused input {
  background: var(--input-focus-bg);
  border-color: var(--input-focus-bdr);
  box-shadow: 0 0 0 3px var(--input-focus-shd);
}

.field-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(90deg, #1f5c2e, #3dd87a);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.form-group.focused .field-line {
  width: 100%;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 4px;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.toggle-password:hover {
  color: #3dd87a;
}

.toggle-password svg {
  width: 17px;
  height: 17px;
}

.login-btn {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.85rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #1f5c2e 0%, #3dd87a 100%);
  color: #edfff3;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 24px rgba(61, 216, 122, 0.28);
  min-height: 50px;
  font-family: inherit;
}

.login-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(237, 255, 243, 0.12), transparent);
  opacity: 0;
  transition: opacity 0.25s;
}

.login-btn:hover:not(:disabled)::before {
  opacity: 1;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(61, 216, 122, 0.42);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}

.btn-text svg {
  width: 18px;
  height: 18px;
  transition: transform 0.2s;
}

.login-btn:hover:not(:disabled) .btn-text svg {
  transform: translateX(4px);
}

.btn-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.btn-loader span {
  width: 7px;
  height: 7px;
  background: #edfff3;
  border-radius: 50%;
  animation: bounce 0.9s ease-in-out infinite;
}

.btn-loader span:nth-child(2) {
  animation-delay: 0.15s;
}

.btn-loader span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: rgba(232, 160, 32, 0.1);
  border: 1px solid rgba(232, 160, 32, 0.28);
  color: #e8a020;
  font-size: 0.85rem;
}

.error-message svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.demo-notes {
  margin-top: 1.75rem;
}

.notes-divider {
  position: relative;
  text-align: center;
  margin-bottom: 1rem;
}

.notes-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--divider);
}

.notes-divider span {
  position: relative;
  padding: 0 0.75rem;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background: var(--divider-bg);
  transition: color 0.3s, background 0.4s;
}

.credentials {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.credential-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.9rem;
  border-radius: 10px;
  background: var(--cred-bg);
  border: 1px solid var(--cred-border);
  cursor: pointer;
  transition: all 0.2s;
}

.credential-item:hover {
  background: var(--cred-hover-bg);
  border-color: var(--cred-hover-bdr);
  transform: translateX(4px);
}

.badge {
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  flex-shrink: 0;
}

.admin-badge {
  background: rgba(61, 216, 122, 0.15);
  border: 1px solid rgba(61, 216, 122, 0.3);
}

.light .admin-badge {
  color: #1a5c2e;
}

.dark .admin-badge {
  color: #3dd87a;
}

.user-badge {
  background: rgba(232, 160, 32, 0.15);
  color: #e8a020;
  border: 1px solid rgba(232, 160, 32, 0.25);
}

.cred-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}

.cred-email {
  font-size: 0.76rem;
  color: var(--text-primary);
  font-family: 'Consolas', 'SF Mono', monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s;
}

.cred-pass {
  font-size: 0.68rem;
  color: var(--text-muted);
  font-family: 'Consolas', 'SF Mono', monospace;
  transition: color 0.3s;
}

.cred-arrow {
  width: 13px;
  height: 13px;
  color: var(--text-muted);
  flex-shrink: 0;
  transition: color 0.2s, transform 0.2s;
}

.credential-item:hover .cred-arrow {
  color: #3dd87a;
  transform: translateX(2px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  .logo-mark {
    width: 70px;
    height: 70px;
  }
  
  .theme-toggle-global {
    top: 1rem;
    right: 1rem;
  }
}
</style>