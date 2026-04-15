<template>
  <button 
    class="theme-toggle" 
    :class="[theme, positionClass]"
    :style="customStyle"
    @click="$emit('toggle-theme')"
    :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <transition name="spin" mode="out-in">
      <!-- Sun icon (shown in dark mode to switch to light) -->
      <svg v-if="theme === 'dark'" key="sun" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/>
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
      <!-- Moon icon (shown in light mode to switch to dark) -->
      <svg v-else key="moon" viewBox="0 0 24 24" fill="none">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </transition>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  theme: {
    type: String,
    required: true,
    validator: (value) => ['dark', 'light'].includes(value)
  },
  // Position preset: 'top-right', 'top-left', 'bottom-right', 'bottom-left', or 'custom'
  position: {
    type: String,
    default: 'top-right',
    validator: (value) => ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'custom'].includes(value)
  },
  // Custom position values (only used when position='custom')
  customTop: {
    type: String,
    default: null
  },
  customRight: {
    type: String,
    default: null
  },
  customBottom: {
    type: String,
    default: null
  },
  customLeft: {
    type: String,
    default: null
  },
  // Use fixed positioning instead of absolute
  fixed: {
    type: Boolean,
    default: false
  },
  // Override default offset values
  offsetTop: {
    type: String,
    default: '1.25rem'
  },
  offsetRight: {
    type: String,
    default: '1.25rem'
  },
  offsetBottom: {
    type: String,
    default: '1.25rem'
  },
  offsetLeft: {
    type: String,
    default: '1.25rem'
  }
})

defineEmits(['toggle-theme'])

// Compute position class for presets
const positionClass = computed(() => {
  if (props.position !== 'custom') {
    return `position-${props.position}`
  }
  return ''
})

// Compute custom styles
const customStyle = computed(() => {
  const positionType = props.fixed ? 'fixed' : 'absolute'
  
  // Handle preset positions with customizable offsets
  if (props.position === 'top-right') {
    return {
      position: positionType,
      top: props.offsetTop,
      right: props.offsetRight
    }
  }
  
  if (props.position === 'top-left') {
    return {
      position: positionType,
      top: props.offsetTop,
      left: props.offsetLeft
    }
  }
  
  if (props.position === 'bottom-right') {
    return {
      position: positionType,
      bottom: props.offsetBottom,
      right: props.offsetRight
    }
  }
  
  if (props.position === 'bottom-left') {
    return {
      position: positionType,
      bottom: props.offsetBottom,
      left: props.offsetLeft
    }
  }
  
  // Handle custom position
  if (props.position === 'custom') {
    const styles = { position: positionType }
    if (props.customTop) styles.top = props.customTop
    if (props.customRight) styles.right = props.customRight
    if (props.customBottom) styles.bottom = props.customBottom
    if (props.customLeft) styles.left = props.customLeft
    return styles
  }
  
  // Fallback
  return { position: positionType }
})
</script>

<style scoped>
.theme-toggle {
  /* No default positioning - will be set by props */
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

/* Preset position classes (fallbacks if no inline styles) */
.position-top-right {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
}

.position-top-left {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
}

.position-bottom-right {
  position: absolute;
  bottom: 1.25rem;
  right: 1.25rem;
}

.position-bottom-left {
  position: absolute;
  bottom: 1.25rem;
  left: 1.25rem;
}

/* Dark mode styles */
.theme-toggle.dark {
  background: rgba(31, 92, 46, 0.45);
  border: 1px solid rgba(61, 216, 122, 0.4);
  color: #3dd87a;
}

.theme-toggle.dark:hover {
  background: rgba(31, 92, 46, 0.7);
  border-color: rgba(61, 216, 122, 0.7);
  transform: scale(1.1) rotate(15deg);
  box-shadow: 0 4px 20px rgba(61, 216, 122, 0.4);
}

/* Light mode styles */
.theme-toggle.light {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(31, 92, 46, 0.3);
  color: #1f5c2e;
}

.theme-toggle.light:hover {
  background: rgba(237, 255, 243, 0.95);
  border-color: rgba(61, 216, 122, 0.5);
  transform: scale(1.1) rotate(15deg);
  box-shadow: 0 4px 20px rgba(61, 216, 122, 0.3);
}

.theme-toggle svg {
  width: 18px;
  height: 18px;
}

/* Transition animations */
.spin-enter-active,
.spin-leave-active {
  transition: all 0.25s ease;
}

.spin-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.spin-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .theme-toggle {
    width: 38px;
    height: 38px;
  }
  
  .theme-toggle svg {
    width: 16px;
    height: 16px;
  }
}
</style>