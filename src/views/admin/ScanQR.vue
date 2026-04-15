<!-- views/admin/ScanQR.vue -->
<template>
  <div class="admin-layout" :class="theme">
    <Header />
    
    <main class="main-content">
      <div class="content-wrapper">
        <div class="bg-orb orb-1"></div>
        <div class="bg-orb orb-2"></div>
        <div class="bg-orb orb-3"></div>

        <div class="scan-container">
          <div class="scan-header">
            <div class="logo-mark">
              <img :src="logoImage" alt="SISIDLAN Logo" class="logo-image" />
            </div>
            <h1>Scan QR Code</h1>
            <p class="scan-description">Position the QR code within the frame to scan</p>
          </div>

          <div class="scanner-area">
            <div class="scanner-frame">
              <div class="scanner-corner top-left"></div>
              <div class="scanner-corner top-right"></div>
              <div class="scanner-corner bottom-left"></div>
              <div class="scanner-corner bottom-right"></div>
              <div class="scanner-line"></div>
            </div>
            <p class="scanner-instruction">Scanning will be implemented here</p>
          </div>

          <div class="scan-actions">
            <button class="btn btn-primary">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M3 9.5L12 3L21 9.5L12 16L3 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M5 11V17L12 21L19 17V11" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
              Start Scanning
            </button>
            <button class="btn btn-secondary">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M4 16l4-4-4-4M12 4h8M12 20h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Upload QR Code
            </button>
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
.dark {
  --bg: #0e160f;
  --orb1: rgba(31, 92, 46, 0.5);
  --orb2: rgba(232, 160, 32, 0.18);
  --orb3: rgba(61, 216, 122, 0.15);
  --card-bg: rgba(18, 38, 20, 0.60);
  --card-border: rgba(61, 216, 122, 0.15);
  --card-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.75), 0 0 80px rgba(31, 92, 46, 0.18);
  --card-inset: rgba(61, 216, 122, 0.05);
  --text-primary: #edfff3;
  --text-secondary: rgba(237, 255, 243, 0.38);
  --text-muted: rgba(237, 255, 243, 0.20);
  --btn-primary-bg: #1f5c2e;
  --btn-primary-hover: #2a7a3e;
  --btn-secondary-bg: rgba(31, 92, 46, 0.2);
  --btn-secondary-hover: rgba(31, 92, 46, 0.3);
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
  --text-primary: #1a3d20;
  --text-secondary: rgba(26, 61, 32, 0.55);
  --text-muted: rgba(26, 61, 32, 0.35);
  --btn-primary-bg: #1f5c2e;
  --btn-primary-hover: #2a7a3e;
  --btn-secondary-bg: rgba(31, 92, 46, 0.1);
  --btn-secondary-hover: rgba(31, 92, 46, 0.2);
}

.admin-layout {
  min-height: 100vh;
  background: var(--bg);
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease;
}

.main-content {
  margin-top: 130px;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

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

.scan-container {
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  background: var(--card-bg);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid var(--card-border);
  border-radius: 32px;
  padding: 2.5rem;
  box-shadow: var(--card-shadow), 0 0 0 1px var(--card-inset) inset;
  text-align: center;
}

.scan-header {
  margin-bottom: 2rem;
}

.logo-mark {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #1f5c2e, #3dd87a);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  overflow: hidden;
  padding: 12px;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.scan-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.scan-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.scanner-area {
  margin: 2rem 0;
}

.scanner-frame {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border: 2px solid var(--card-border);
  border-radius: 20px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
}

.scanner-corner {
  position: absolute;
  width: 30px;
  height: 30px;
  border-color: #3dd87a;
  border-style: solid;
}

.scanner-corner.top-left {
  top: 10px;
  left: 10px;
  border-width: 3px 0 0 3px;
}

.scanner-corner.top-right {
  top: 10px;
  right: 10px;
  border-width: 3px 3px 0 0;
}

.scanner-corner.bottom-left {
  bottom: 10px;
  left: 10px;
  border-width: 0 0 3px 3px;
}

.scanner-corner.bottom-right {
  bottom: 10px;
  right: 10px;
  border-width: 0 3px 3px 0;
}

.scanner-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #3dd87a;
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% {
    top: 0;
  }
  50% {
    top: 100%;
  }
  100% {
    top: 0;
  }
}

.scanner-instruction {
  margin-top: 1rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.scan-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.btn-primary {
  background: var(--btn-primary-bg);
  color: white;
}

.btn-primary:hover {
  background: var(--btn-primary-hover);
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--btn-secondary-bg);
  color: var(--text-primary);
  border: 1px solid var(--card-border);
}

.btn-secondary:hover {
  background: var(--btn-secondary-hover);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }
  
  .scan-container {
    padding: 1.5rem;
  }
  
  .scanner-frame {
    width: 250px;
    height: 250px;
  }
  
  .scan-header h1 {
    font-size: 1.5rem;
  }
  
  .scan-actions {
    flex-direction: column;
  }
  
  .btn {
    justify-content: center;
  }
}
</style>