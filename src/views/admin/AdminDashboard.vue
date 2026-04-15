<!-- views/admin/AdminDashboard.vue -->
<template>
  <div class="admin-layout" :class="theme">
    <Header />
    
    <main class="main-content">
      <div class="content-wrapper">
        <div class="bg-orb orb-1"></div>
        <div class="bg-orb orb-2"></div>
        <div class="bg-orb orb-3"></div>

        <!-- Workspace Section -->
        <div class="workspace-section">
          <div class="workspace-header">
            <div class="logo-mark">
              <img :src="logoImage" alt="SISIDLAN Logo" class="logo-image" />
            </div>
            <h1>WORKSPACE</h1>
            <h2 class="workspace-subtitle">Dashboard</h2>
            <p class="workspace-description">Overview of inventory health, requests, approvals, and system readiness.</p>
          </div>

          <!-- Stats Grids -->
          <div class="stats-container">
            <!-- Row 1: Quick Stats -->
            <div class="stats-row">
              <div class="stat-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>Notifications</h3>
                  <p class="stat-value">12</p>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M22 12h-4l-3 9-4-18-3 9H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>Pending Requests</h3>
                  <p class="stat-value">0</p>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>Low Stock</h3>
                  <p class="stat-value">3</p>
                </div>
              </div>
            </div>

            <!-- Row 2: Inventory Section -->
            <div class="section-title">
              <h3>Inventory Overview</h3>
            </div>
            <div class="stats-row">
              <div class="stat-card inventory-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>Inventory</h3>
                  <p class="stat-value-large">8</p>
                  <p class="stat-label">Total Items</p>
                  <p class="stat-description">Combined inventory item records from supplies and equipment.</p>
                </div>
              </div>

              <div class="stat-card warning-card">
                <div class="stat-icon warning-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4m0 4h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>Warning</h3>
                  <p class="stat-value-large">3</p>
                  <p class="stat-label">Low Stock</p>
                  <p class="stat-description">Items currently at or below the low-stock threshold.</p>
                </div>
              </div>
            </div>

            <!-- Row 3: Workflow Section -->
            <div class="section-title">
              <h3>Workflow Management</h3>
            </div>
            <div class="stats-row">
              <div class="stat-card workflow-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M12 12v4m0 0l-2-2m2 2l2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>Workflow</h3>
                  <p class="stat-value-large">0</p>
                  <p class="stat-label">Pending Requests</p>
                  <p class="stat-description">Requests waiting for admin or project manager action.</p>
                </div>
              </div>

              <div class="stat-card success-card">
                <div class="stat-icon success-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>Decisions</h3>
                  <p class="stat-value-large">0</p>
                  <p class="stat-label">Approved Requests</p>
                  <p class="stat-description">Notifications generated after request approval.</p>
                </div>
              </div>

              <div class="stat-card danger-card">
                <div class="stat-icon danger-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m-6 6a9 9 0 1 1 0-18 9 9 0 0 1 0 18z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>Decisions</h3>
                  <p class="stat-value-large">0</p>
                  <p class="stat-label">Rejected Requests</p>
                  <p class="stat-description">Notifications generated after request rejection.</p>
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
  --warning-bg: rgba(255, 193, 7, 0.12);
  --warning-border: rgba(255, 193, 7, 0.25);
  --success-bg: rgba(40, 167, 69, 0.12);
  --success-border: rgba(40, 167, 69, 0.25);
  --danger-bg: rgba(220, 53, 69, 0.12);
  --danger-border: rgba(220, 53, 69, 0.25);
  --section-title: rgba(61, 216, 122, 0.6);
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
  --warning-bg: rgba(255, 193, 7, 0.08);
  --warning-border: rgba(255, 193, 7, 0.2);
  --success-bg: rgba(40, 167, 69, 0.08);
  --success-border: rgba(40, 167, 69, 0.2);
  --danger-bg: rgba(220, 53, 69, 0.08);
  --danger-border: rgba(220, 53, 69, 0.2);
  --section-title: rgba(31, 92, 46, 0.7);
}

.admin-layout {
  min-height: 100vh;
  background: var(--bg);
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease;
}

.main-content {
  margin-top: 130px; /* 70px header + 60px navbar */
  position: relative;
  min-height: calc(100vh - 130px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.content-wrapper {
  padding: 2rem;
  position: relative;
  min-height: calc(100vh - 130px);
  width: 100%;
}

/* Orbs */
.bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  transition: background 0.4s ease;
  z-index: 0;
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

/* Workspace Section */
.workspace-section {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  background: var(--card-bg);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid var(--card-border);
  border-radius: 32px;
  padding: 2.5rem;
  box-shadow: var(--card-shadow), 0 0 0 1px var(--card-inset) inset;
  transition: all 0.4s ease;
}

.workspace-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--card-border);
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
  box-shadow: 0 8px 28px rgba(61, 216, 122, 0.35);
  overflow: hidden;
  padding: 16px;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.workspace-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 8px;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 40px rgba(61, 216, 122, 0.2);
}

.workspace-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.workspace-description {
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

/* Stats Container */
.stats-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.section-title {
  margin-bottom: 0.5rem;
}

.section-title h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--section-title);
  letter-spacing: 1px;
  text-transform: uppercase;
  border-left: 4px solid #3dd87a;
  padding-left: 1rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Stat Cards */
.stat-card {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--stat-bg);
  border: 1px solid var(--stat-border);
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-4px);
  background: var(--stat-hover-bg);
  border-color: rgba(61, 216, 122, 0.4);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
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

.stat-info {
  flex: 1;
}

.stat-info h3 {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.stat-value-large {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0.25rem 0;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.stat-description {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.4;
  margin-top: 0.5rem;
}

/* Inventory Card */
.inventory-card {
  background: var(--stat-bg);
}

/* Warning Card */
.warning-card {
  background: var(--warning-bg);
  border-color: var(--warning-border);
}

.warning-icon {
  color: #ffc107;
}

/* Success Card */
.success-card {
  background: var(--success-bg);
  border-color: var(--success-border);
}

.success-icon {
  color: #28a745;
}

/* Danger Card */
.danger-card {
  background: var(--danger-bg);
  border-color: var(--danger-border);
}

.danger-icon {
  color: #dc3545;
}

/* Workflow Card */
.workflow-card {
  background: var(--stat-bg);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .workspace-section {
    padding: 2rem;
  }
  
  .stats-row {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }
  
  .workspace-section {
    padding: 1.5rem;
  }
  
  .workspace-header h1 {
    font-size: 1.75rem;
    letter-spacing: 4px;
  }
  
  .workspace-subtitle {
    font-size: 1.2rem;
  }
  
  .workspace-description {
    font-size: 0.85rem;
  }
  
  .logo-mark {
    width: 70px;
    height: 70px;
    padding: 12px;
  }
  
  .stats-row {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1.25rem;
  }
  
  .stat-icon {
    width: 40px;
    height: 40px;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .stat-value-large {
    font-size: 2rem;
  }
  
  .section-title h3 {
    font-size: 1rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-row:first-child {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>