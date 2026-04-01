<template>
  <transition name="fade-scale">
    <div v-if="visible" class="loading-overlay">
      <div class="loading-card">
        <div class="loading-logo-container">
          <!-- Original logo image -->
          <div class="logo-wrapper">
            <img :src="logoImage" alt="SISIDLAN Logo" class="loading-logo-image" />
          </div>
          
          <div class="loading-text">
            <span>S</span>
            <span>I</span>
            <span>S</span>
            <span>I</span>
            <span>D</span>
            <span>L</span>
            <span>A</span>
            <span>N</span>
          </div>
        </div>
        
        <div class="loading-message">
          <p>{{ message }}</p>
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div class="loading-progress">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch } from 'vue'
import logoImage from '@/assets/images/logo.png'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Authenticating your credentials...'
  },
  progress: {
    type: Number,
    default: 0
  }
})

// Optional: Auto-reset progress when hidden
watch(() => props.visible, (newVal) => {
  if (!newVal) {
    // Reset progress when hidden (optional)
    // You can add logic here if needed
  }
})
</script>

<style scoped>
/* ═══════════════════════════════════════
   TRANSPARENT LOADING OVERLAY STYLES
═══════════════════════════════════════ */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* More transparent background */
  backdrop-filter: blur(8px); /* Lighter blur */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease-out;
}

.loading-card {
  background: rgba(18, 38, 20, 0.45); /* More transparent glass effect */
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(61, 216, 122, 0.25);
  border-radius: 32px;
  padding: 3rem 2.5rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(61, 216, 122, 0.1) inset;
  animation: slideUp 0.4s ease-out;
  transition: all 0.3s ease;
}

/* Light mode specific transparency */
.light .loading-card {
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(31, 92, 46, 0.2);
  box-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.15);
}

.loading-logo-container {
  margin-bottom: 2rem;
}

.logo-wrapper {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: logoPulse 1.5s ease-in-out infinite;
}

.loading-logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* No filters - logo appears in its original form */
}

.loading-text {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 4px;
}

.loading-text span {
  color: var(--text-primary);
  animation: textPulse 1.4s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.1s);
}

.loading-text span:nth-child(1) { --i: 1; }
.loading-text span:nth-child(2) { --i: 2; }
.loading-text span:nth-child(3) { --i: 3; }
.loading-text span:nth-child(4) { --i: 4; }
.loading-text span:nth-child(5) { --i: 5; }
.loading-text span:nth-child(6) { --i: 6; }
.loading-text span:nth-child(7) { --i: 7; }
.loading-text span:nth-child(8) { --i: 8; }

.loading-message {
  margin: 1.5rem 0;
}

.loading-message p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3dd87a;
  animation: dotPulse 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

.loading-progress {
  margin-top: 1.5rem;
  height: 3px;
  background: rgba(61, 216, 122, 0.15);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #1f5c2e, #3dd87a);
  border-radius: 3px;
  transition: width 0.3s ease;
  animation: shimmer 1s ease-in-out infinite;
  background-size: 200% 100%;
}

/* Light mode progress bar */
.light .progress-bar {
  background: linear-gradient(90deg, #2c7a3e, #4ade80);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes logoPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

@keyframes textPulse {
  0%, 100% {
    opacity: 0.4;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Transitions */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>