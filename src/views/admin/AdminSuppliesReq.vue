<template>
  <div class="admin-layout" :class="theme">
    <Header />
    
    <main class="main-content">
      <div class="content-wrapper">
        <div class="bg-orb orb-1"></div>
        <div class="bg-orb orb-2"></div>
        <div class="bg-orb orb-3"></div>

        <div class="supplies-container">
          <div class="supplies-header">
            <div class="logo-mark">
              <img :src="logoImage" alt="SISIDLAN Logo" class="logo-image" />
            </div>
            <h1>Supplies Request</h1>
            <p class="supplies-description">Request and manage school supplies inventory</p>
          </div>

          <!-- Summary Cards -->
          <div class="summary-grid">
            <div class="summary-card">
              <div class="summary-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 7L12 12L4 7M20 7V17L12 22L4 17V7M20 7L12 2L4 7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                  <path d="M12 12V22M12 12L20 7M12 12L4 7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="summary-info">
                <span class="summary-label">Total Requests</span>
                <span class="summary-value">{{ stats.total }}</span>
              </div>
            </div>

            <div class="summary-card">
              <div class="summary-icon pending">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="summary-info">
                <span class="summary-label">Pending</span>
                <span class="summary-value">{{ stats.pending }}</span>
              </div>
            </div>

            <div class="summary-card">
              <div class="summary-icon approved">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="summary-info">
                <span class="summary-label">Approved</span>
                <span class="summary-value">{{ stats.approved }}</span>
              </div>
            </div>

            <div class="summary-card">
              <div class="summary-icon rejected">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="summary-info">
                <span class="summary-label">Rejected</span>
                <span class="summary-value">{{ stats.rejected }}</span>
              </div>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="action-bar">
            <div class="search-box">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <input type="text" placeholder="Search requests..." v-model="searchQuery" />
            </div>
            <button class="btn btn-primary" @click="openRequestModal">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              New Request
            </button>
          </div>

          <!-- Requests Table -->
          <div class="table-wrapper">
            <table class="requests-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Requested By</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="request in filteredRequests" :key="request.id">
                  <td class="request-id">#{{ request.id }}</td>
                  <td>{{ request.itemName }}</td>
                  <td>{{ request.quantity }} pcs</td>
                  <td>{{ request.requestedBy }}</td>
                  <td>{{ formatDate(request.date) }}</td>
                  <td>
                    <span :class="['status-badge', request.status]">
                      {{ request.status }}
                    </span>
                  </td>
                  <td class="actions-cell">
                    <button class="icon-btn view" @click="viewRequest(request)" title="View">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
                      </svg>
                    </button>
                    <button class="icon-btn edit" @click="editRequest(request)" title="Edit">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <button class="icon-btn delete" @click="deleteRequest(request)" title="Delete">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredRequests.length === 0">
                  <td colspan="7" class="empty-state">
                    <p>No requests found</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Request Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit Request' : 'New Supply Request' }}</h2>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Item Name</label>
            <input type="text" v-model="form.itemName" placeholder="Enter item name" />
          </div>
          <div class="form-group">
            <label>Quantity</label>
            <input type="number" v-model="form.quantity" placeholder="Enter quantity" min="1" />
          </div>
          <div class="form-group">
            <label>Requested By</label>
            <input type="text" v-model="form.requestedBy" placeholder="Your name" />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="form.status">
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">Cancel</button>
          <button class="btn btn-primary" @click="saveRequest">{{ isEditing ? 'Update' : 'Create' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import Header from '@/components/Header.vue'
import logoImage from '@/assets/images/logo.png'

const theme = inject('theme')

// Component state
const searchQuery = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const currentId = ref(null)

// Form data
const form = ref({
  itemName: '',
  quantity: 1,
  requestedBy: '',
  status: 'pending'
})

// Sample data
const requests = ref([
  {
    id: 1,
    itemName: 'Notebooks',
    quantity: 50,
    requestedBy: 'John Doe',
    date: new Date(2024, 0, 15),
    status: 'approved'
  },
  {
    id: 2,
    itemName: 'Ballpens',
    quantity: 100,
    requestedBy: 'Jane Smith',
    date: new Date(2024, 0, 16),
    status: 'pending'
  },
  {
    id: 3,
    itemName: 'Whiteboard Markers',
    quantity: 20,
    requestedBy: 'Mike Johnson',
    date: new Date(2024, 0, 17),
    status: 'rejected'
  }
])

// Stats computed
const stats = computed(() => ({
  total: requests.value.length,
  pending: requests.value.filter(r => r.status === 'pending').length,
  approved: requests.value.filter(r => r.status === 'approved').length,
  rejected: requests.value.filter(r => r.status === 'rejected').length
}))

// Filtered requests
const filteredRequests = computed(() => {
  if (!searchQuery.value) return requests.value
  const query = searchQuery.value.toLowerCase()
  return requests.value.filter(r => 
    r.itemName.toLowerCase().includes(query) ||
    r.requestedBy.toLowerCase().includes(query) ||
    r.id.toString().includes(query)
  )
})

// Methods
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const openRequestModal = () => {
  isEditing.value = false
  currentId.value = null
  form.value = {
    itemName: '',
    quantity: 1,
    requestedBy: '',
    status: 'pending'
  }
  showModal.value = true
}

const editRequest = (request) => {
  isEditing.value = true
  currentId.value = request.id
  form.value = {
    itemName: request.itemName,
    quantity: request.quantity,
    requestedBy: request.requestedBy,
    status: request.status
  }
  showModal.value = true
}

const viewRequest = (request) => {
  // View logic - can be expanded
  alert(`Request #${request.id}\nItem: ${request.itemName}\nQuantity: ${request.quantity}\nRequested by: ${request.requestedBy}\nStatus: ${request.status}`)
}

const deleteRequest = (request) => {
  if (confirm(`Delete request #${request.id}?`)) {
    const index = requests.value.findIndex(r => r.id === request.id)
    if (index !== -1) {
      requests.value.splice(index, 1)
    }
  }
}

const saveRequest = () => {
  if (!form.value.itemName || !form.value.quantity || !form.value.requestedBy) {
    alert('Please fill all fields')
    return
  }

  if (isEditing.value) {
    const index = requests.value.findIndex(r => r.id === currentId.value)
    if (index !== -1) {
      requests.value[index] = {
        ...requests.value[index],
        itemName: form.value.itemName,
        quantity: form.value.quantity,
        requestedBy: form.value.requestedBy,
        status: form.value.status
      }
    }
  } else {
    const newId = requests.value.length > 0 
      ? Math.max(...requests.value.map(r => r.id)) + 1 
      : 1
    requests.value.push({
      id: newId,
      itemName: form.value.itemName,
      quantity: form.value.quantity,
      requestedBy: form.value.requestedBy,
      date: new Date(),
      status: form.value.status
    })
  }
  closeModal()
}

const closeModal = () => {
  showModal.value = false
  isEditing.value = false
  currentId.value = null
}
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
  --table-header-bg: rgba(31, 92, 46, 0.15);
  --table-row-hover: rgba(61, 216, 122, 0.05);
  --modal-bg: rgba(18, 38, 20, 0.95);
  --input-bg: rgba(255, 255, 255, 0.08);
  --border-color: rgba(61, 216, 122, 0.2);
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
  --table-header-bg: rgba(31, 92, 46, 0.08);
  --table-row-hover: rgba(61, 216, 122, 0.05);
  --modal-bg: rgba(255, 255, 255, 0.95);
  --input-bg: rgba(0, 0, 0, 0.04);
  --border-color: rgba(31, 92, 46, 0.15);
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

.supplies-container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background: var(--card-bg);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid var(--card-border);
  border-radius: 32px;
  padding: 2.5rem;
  box-shadow: var(--card-shadow), 0 0 0 1px var(--card-inset) inset;
}

.supplies-header {
  text-align: center;
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

.supplies-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.supplies-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Summary Cards */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: var(--card-inset);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.summary-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--btn-primary-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.summary-icon svg {
  width: 24px;
  height: 24px;
}

.summary-icon.pending {
  background: #f59e0b;
}

.summary-icon.approved {
  background: #10b981;
}

.summary-icon.rejected {
  background: #ef4444;
}

.summary-info {
  flex: 1;
}

.summary-label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.summary-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  max-width: 300px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-muted);
}

.search-box input {
  width: 100%;
  padding: 0.6rem 0.75rem 0.6rem 2.5rem;
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #3dd87a;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
  border-radius: 16px;
}

.requests-table {
  width: 100%;
  border-collapse: collapse;
}

.requests-table thead {
  background: var(--table-header-bg);
}

.requests-table th {
  text-align: left;
  padding: 1rem;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border-color);
}

.requests-table td {
  padding: 1rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.requests-table tbody tr:hover {
  background: var(--table-row-hover);
}

.request-id {
  font-weight: 600;
  color: var(--text-primary);
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.pending {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}

.status-badge.approved {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.status-badge.rejected {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: var(--text-secondary);
}

.icon-btn svg {
  width: 18px;
  height: 18px;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.icon-btn.view:hover {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.icon-btn.edit:hover {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.icon-btn.delete:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.empty-state {
  text-align: center;
  padding: 3rem !important;
  color: var(--text-muted);
}

/* Buttons */
.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 12px;
  font-size: 0.85rem;
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

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: var(--modal-bg);
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
  color: var(--text-primary);
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s;
  line-height: 1;
}

.close-btn:hover {
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3dd87a;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }
  
  .supplies-container {
    padding: 1.5rem;
  }
  
  .supplies-header h1 {
    font-size: 1.5rem;
  }
  
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .action-bar {
    flex-direction: column;
  }
  
  .search-box {
    max-width: 100%;
    width: 100%;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .actions-cell {
    flex-wrap: wrap;
  }
}
</style>