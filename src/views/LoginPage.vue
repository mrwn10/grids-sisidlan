<template>
  <div class="min-h-screen flex items-center justify-center p-6"
       :class="[
         theme === 'dark' ? 'bg-dark-background' : 'bg-background-light'
       ]">
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 mx-auto"
             :class="[
               theme === 'dark' 
                 ? 'bg-dark-header' 
                 : 'bg-primary'
             ]">
          <svg class="w-10 h-10" 
               :class="[
                 theme === 'dark' ? 'text-dark-text' : 'text-white'
               ]" 
               fill="none" 
               stroke="currentColor" 
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold mb-2 font-space-grotesk"
            :class="[
              theme === 'dark' ? 'text-dark-text' : 'text-text-light'
            ]">
          Welcome Back
        </h2>
        <p :class="[
            theme === 'dark' ? 'text-dark-text/80' : 'text-text-light/70'
          ]">
          Sign in to your account
        </p>
      </div>

      <!-- Login Form -->
      <div class="rounded-2xl p-8 backdrop-blur-md border transition-all duration-300"
           :class="[
             theme === 'dark' 
               ? 'bg-dark-header/50 border-white/10' 
               : 'bg-white/50 border-primary/20'
           ]">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium mb-2"
                   :class="[
                     theme === 'dark' ? 'text-dark-text' : 'text-text-light'
                   ]">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5" 
                     :class="[
                       theme === 'dark' ? 'text-dark-text/60' : 'text-text-light/60'
                     ]" 
                     fill="none" 
                     stroke="currentColor" 
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                v-model="email"
                type="email"
                required
                class="w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                :class="[
                  theme === 'dark' 
                    ? 'bg-dark-background/50 border border-white/20 text-dark-text placeholder-dark-text/50 focus:border-dark-text focus:ring-dark-text/50' 
                    : 'bg-white/80 border border-primary/20 text-text-light placeholder-text-light/50 focus:border-primary focus:ring-primary/50'
                ]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-medium mb-2"
                   :class="[
                     theme === 'dark' ? 'text-dark-text' : 'text-text-light'
                   ]">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5" 
                     :class="[
                       theme === 'dark' ? 'text-dark-text/60' : 'text-text-light/60'
                     ]" 
                     fill="none" 
                     stroke="currentColor" 
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4V8a4 4 0 00-8 0v3h8z" />
                </svg>
              </div>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                :class="[
                  theme === 'dark' 
                    ? 'bg-dark-background/50 border border-white/20 text-dark-text placeholder-dark-text/50 focus:border-dark-text focus:ring-dark-text/50' 
                    : 'bg-white/80 border border-primary/20 text-text-light placeholder-text-light/50 focus:border-primary focus:ring-primary/50'
                ]"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="!showPassword" 
                     class="h-5 w-5" 
                     :class="[
                       theme === 'dark' ? 'text-dark-text/60 hover:text-dark-text' : 'text-text-light/60 hover:text-text-light'
                     ]" 
                     fill="none" 
                     stroke="currentColor" 
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else 
                     class="h-5 w-5" 
                     :class="[
                       theme === 'dark' ? 'text-dark-text/60 hover:text-dark-text' : 'text-text-light/60 hover:text-text-light'
                     ]" 
                     fill="none" 
                     stroke="currentColor" 
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" v-model="rememberMe" 
                     class="w-4 h-4 rounded focus:ring-2"
                     :class="[
                       theme === 'dark' 
                         ? 'bg-dark-background/50 border-white/20 text-dark-text focus:ring-dark-text' 
                         : 'bg-white/80 border-primary/20 text-primary focus:ring-primary'
                     ]">
              <span class="ml-2 text-sm"
                    :class="[
                      theme === 'dark' ? 'text-dark-text/80' : 'text-text-light/80'
                    ]">
                Remember me
              </span>
            </label>
            <a href="#" class="text-sm transition-colors duration-300"
               :class="[
                 theme === 'dark' 
                   ? 'text-dark-text hover:text-dark-text/80' 
                   : 'text-primary hover:text-primary/80'
               ]">
              Forgot password?
            </a>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            :class="[
              theme === 'dark' 
                ? 'bg-dark-text text-dark-background hover:shadow-lg' 
                : 'bg-primary text-white hover:shadow-lg'
            ]"
          >
            <span v-if="!loading">Sign In</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>

          <!-- Error Message -->
          <div v-if="errorMessage" 
               class="rounded-lg p-3"
               :class="[
                 theme === 'dark' 
                   ? 'bg-red-500/20 border border-red-500/50' 
                   : 'bg-red-100 border border-red-300'
               ]">
            <p class="text-sm text-center"
               :class="[
                 theme === 'dark' ? 'text-red-300' : 'text-red-700'
               ]">
              {{ errorMessage }}
            </p>
          </div>
        </form>

        <!-- Sign Up Link -->
        <div class="mt-6 text-center">
          <p :class="[
              theme === 'dark' ? 'text-dark-text/80' : 'text-text-light/80'
            ]">
            Don't have an account?
            <a href="#" class="font-semibold transition-colors duration-300"
               :class="[
                 theme === 'dark' 
                   ? 'text-dark-text hover:text-dark-text/80' 
                   : 'text-primary hover:text-primary/80'
               ]">
              Sign up
            </a>
          </p>
        </div>
      </div>

      <!-- Demo Credentials -->
      <div class="mt-6 rounded-xl p-4 backdrop-blur-md border"
           :class="[
             theme === 'dark' 
               ? 'bg-dark-header/30 border-white/10' 
               : 'bg-white/30 border-primary/20'
           ]">
        <p class="text-xs text-center"
           :class="[
             theme === 'dark' ? 'text-dark-text/60' : 'text-text-light/60'
           ]">
          Demo credentials: 
          <span :class="[
            theme === 'dark' ? 'text-dark-text' : 'text-text-light'
          ]">admin@example.com</span> / 
          <span :class="[
            theme === 'dark' ? 'text-dark-text' : 'text-text-light'
          ]">password123</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const theme = ref('dark') // Default to dark mode

// Check current theme from localStorage
const savedTheme = localStorage.getItem('theme')
if (savedTheme) {
  theme.value = savedTheme
}

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  
  // Simulate API call
  setTimeout(() => {
    // Demo validation
    if (email.value === 'admin@example.com' && password.value === 'password123') {
      // Store auth state
      localStorage.setItem('isAuthenticated', 'true')
      if (rememberMe.value) {
        localStorage.setItem('rememberMe', 'true')
      }
      
      // Redirect to dashboard or home
      router.push('/dashboard')
    } else {
      errorMessage.value = 'Invalid email or password. Try: admin@example.com / password123'
    }
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>