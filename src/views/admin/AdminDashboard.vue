<!-- views/admin/AdminDashboard.vue -->
<template>
  <div class="admin-layout" :class="theme">
    <Header />
    
    <main class="main-content">
      <div class="content-wrapper">
        <div class="bg-orb orb-1"></div>
        <div class="bg-orb orb-2"></div>
        <div class="bg-orb orb-3"></div>

        <div class="dashboard-card">
          <div class="card-grid"></div>

          <!-- Changed from dashboard-header to dashboard-title-section -->
          <div class="dashboard-title-section">
            <div class="logo-mark">
              <img :src="logoImage" alt="SISIDLAN Logo" class="logo-image" />
            </div>
            <h1>ADMIN DASHBOARD</h1>
            <p class="welcome-text">Welcome back, Administrator!</p>
          </div>

          <div class="dashboard-content">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>Active Sessions</h3>
                  <p>1</p>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>System Status</h3>
                  <p>Operational</p>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>Database</h3>
                  <p>Connected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import Header from '@/components/Header.vue'
import logoImage from '@/assets/images/logo.png'

const theme = inject('theme')
</script>

<style scoped>
/* ═══════════════════════════════════════
   CSS VARIABLES — DARK MODE (default)
═══════════════════════════════════════ */
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
  --stat-bg: rgba(31, 92, 46, 0.22);
  --stat-border: rgba(61, 216, 122, 0.14);
  --stat-hover-bg: rgba(31, 92, 46, 0.32);
}

/* ═══════════════════════════════════════
   CSS VARIABLES — LIGHT MODE
═══════════════════════════════════════ */
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
  --stat-bg: rgba(237, 255, 243, 0.6);
  --stat-border: rgba(31, 92, 46, 0.12);
  --stat-hover-bg: rgba(237, 255, 243, 0.95);
}

.admin-layout {
  min-height: 100vh;
  background: var(--bg);
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  transition: background 0.4s ease;
}

.main-content {
  margin-top: 70px;
  position: relative;
  min-height: calc(100vh - 70px);
  width: 100%;
}

.content-wrapper {
  padding: 2rem;
  position: relative;
  min-height: calc(100vh - 70px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  0%, 100% { transform: translate(0, 0) scale(1); }
  40% { transform: translate(22px, -22px) scale(1.04); }
  70% { transform: translate(-14px, 14px) scale(0.97); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  35% { transform: translate(-18px, 18px) scale(1.05); }
  70% { transform: translate(12px, -12px) scale(0.98); }
}

@keyframes float3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  40% { transform: translate(14px, -14px) scale(1.03); }
  70% { transform: translate(-9px, 9px) scale(0.97); }
}

/* Glass Card */
.dashboard-card {
  position: relative;
  background: var(--card-bg);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 2.5rem 2.25rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
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

/* Changed from .dashboard-header to .dashboard-title-section */
.dashboard-title-section {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-mark {
  width: 100px;
  height: 100px;
  border-radius: 24px;
  background: linear-gradient(135deg, #1f5c2e, #3dd87a);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 28px rgba(61, 216, 122, 0.35), 0 0 0 1px rgba(237, 255, 243, 0.1) inset;
  overflow: hidden;
  padding: 16px;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.dashboard-title-section h1 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 6px;
  color: var(--text-primary);
  text-shadow: 0 0 40px rgba(61, 216, 122, 0.2);
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

.welcome-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
  transition: color 0.3s;
}

/* Dashboard Content */
.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--stat-bg);
  border: 1px solid var(--stat-border);
  border-radius: 20px;
  transition: all 0.25s ease;
  cursor: pointer;
}

.stat-card:hover {
  background: var(--stat-hover-bg);
  border-color: rgba(61, 216, 122, 0.4);
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  color: #3dd87a;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 100%;
  height: 100%;
}

.stat-info h3 {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
}

.stat-info p {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1.5rem;
  }
  
  .dashboard-card {
    padding: 1.5rem;
    max-width: 100%;
  }
  
  .logo-mark {
    width: 80px;
    height: 80px;
  }
  
  .dashboard-title-section h1 {
    font-size: 1.5rem;
    letter-spacing: 4px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-icon {
    width: 40px;
    height: 40px;
  }
  
  .stat-info p {
    font-size: 1.25rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .dashboard-card {
    max-width: 700px;
  }
  
  .stats-grid {
    gap: 1rem;
  }
}
</style>