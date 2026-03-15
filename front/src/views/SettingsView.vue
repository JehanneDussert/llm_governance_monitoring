<template>
  <div class="settings-view">
    <div class="page-header">
      <h1 class="page-title">Settings</h1>
      <button
        class="save-btn"
        :class="{ saving: store.saving }"
        @click="save"
        :disabled="store.saving || !store.config"
      >
        {{ store.saving ? 'saving...' : 'save' }}
      </button>
    </div>

    <div v-if="store.loading" class="loading-state">
      <div class="loading-dots"><span/><span/><span/></div>
    </div>

    <div v-else-if="store.config" class="settings-content">

      <!-- Judge model -->
      <section class="settings-section">
        <div class="section-header">
          <div class="section-title">JUDGE MODEL</div>
          <div class="section-desc">Modèle Ollama utilisé pour évaluer les réponses</div>
        </div>
        <select v-model="store.config.judge_model" class="field-select">
            <option value="ollama/gemma3:1b">ollama/gemma3:1b — rapide, bon JSON</option>
            <option value="ollama/qwen2.5:1.5b">ollama/qwen2.5:1.5b — multilingue</option>
            <option value="ollama/llama3.2:3b">ollama/llama3.2:3b</option>
            <option value="ollama/deepseek-r1:1.5b">ollama/deepseek-r1:1.5b</option>
          </select>
      </section>

      <!-- Use cases -->
      <section class="settings-section">
        <div class="section-header">
          <div class="section-title">CAS D'USAGE ACTIF</div>
          <div class="section-desc">Le juge adapte ses critères au contexte sélectionné</div>
        </div>
        <div class="use-cases-grid">
          <button
            v-for="uc in store.config.use_cases"
            :key="uc.id"
            class="use-case-btn"
            :class="{ active: store.config.active_use_case_id === uc.id }"
            @click="store.config!.active_use_case_id = uc.id"
          >
            <span class="uc-label">{{ uc.label }}</span>
            <span class="uc-desc">{{ uc.description }}</span>
          </button>
          <button class="use-case-btn use-case-add" @click="showAddUseCase = true">
            <span class="uc-label">+ Ajouter</span>
            <span class="uc-desc">Définir un cas d'usage custom</span>
          </button>
        </div>

        <!-- Add use case form -->
        <div v-if="showAddUseCase" class="add-form">
          <input v-model="newUseCase.label" class="field-input" placeholder="Label (ex: Traduction juridique)" />
          <input v-model="newUseCase.description" class="field-input" placeholder="Description courte" />
          <div class="add-form-actions">
            <button class="btn-secondary" @click="showAddUseCase = false">annuler</button>
            <button class="btn-primary" @click="addUseCase">ajouter</button>
          </div>
        </div>
      </section>

      <!-- Criteria -->
      <section class="settings-section">
        <div class="section-header">
          <div class="section-title">CRITÈRES D'ÉVALUATION</div>
          <div class="section-desc">Critères actifs pour le scoring. Les critères visibles dans le chat sont affichés sous chaque réponse.</div>
        </div>

        <div class="criteria-list">
          <div
            v-for="criterion in store.config.criteria"
            :key="criterion.id"
            class="criterion-row"
            :class="{ disabled: !criterion.enabled }"
          >
            <div class="criterion-left">
              <label class="toggle">
                <input type="checkbox" v-model="criterion.enabled" />
                <span class="toggle-track" />
              </label>
              <div class="criterion-info">
                <span class="criterion-label">{{ criterion.label }}</span>
                <span class="criterion-desc">{{ criterion.description }}</span>
              </div>
            </div>
            <div class="criterion-right">
              <div class="weight-control">
                <span class="weight-label">poids</span>
                <input
                  type="number"
                  v-model.number="criterion.weight"
                  min="0.1"
                  max="3"
                  step="0.1"
                  class="weight-input"
                  :disabled="!criterion.enabled"
                />
              </div>
              <label class="chat-toggle" :title="'Visible dans le chat'">
                <input
                  type="checkbox"
                  :checked="store.config!.visible_in_chat.includes(criterion.id)"
                  :disabled="!criterion.enabled"
                  @change="toggleChatVisible(criterion.id)"
                />
                <span class="chat-toggle-label">chat</span>
              </label>
            </div>
          </div>

          <!-- Custom criterion -->
          <button class="add-criterion-btn" @click="showAddCriterion = true">
            + Ajouter un critère custom
          </button>

          <div v-if="showAddCriterion" class="add-form">
            <input v-model="newCriterion.label" class="field-input" placeholder="Label (ex: Sobriété énergétique)" />
            <input v-model="newCriterion.description" class="field-input" placeholder="Description pour le juge" />
            <div class="add-form-actions">
              <button class="btn-secondary" @click="showAddCriterion = false">annuler</button>
              <button class="btn-primary" @click="addCriterion">ajouter</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Thresholds -->
      <section class="settings-section">
        <div class="section-header">
          <div class="section-title">SEUILS D'ALERTE</div>
          <div class="section-desc">Déclenche des alertes visuelles dans le dashboard</div>
        </div>
        <div class="thresholds-grid">
          <div class="threshold-field">
            <label class="field-label">Latence max (ms)</label>
            <input
              type="number"
              v-model.number="store.config.latency_threshold_ms"
              class="field-input"
              placeholder="ex: 5000"
            />
          </div>
          <div class="threshold-field">
            <label class="field-label">Score min</label>
            <input
              type="number"
              v-model.number="store.config.score_threshold"
              class="field-input"
              placeholder="ex: 0.6"
              min="0" max="1" step="0.05"
            />
          </div>
          <div class="threshold-field">
            <label class="field-label">Taux d'erreur max</label>
            <input
              type="number"
              v-model.number="store.config.error_rate_threshold"
              class="field-input"
              placeholder="ex: 0.05"
              min="0" max="1" step="0.01"
            />
          </div>
        </div>
      </section>

      <!-- Policy rules -->
      <section class="settings-section">
        <div class="section-header">
          <div class="section-title">RÈGLES DE POLITIQUE</div>
          <div class="section-desc">Instructions supplémentaires transmises au juge pour chaque évaluation</div>
        </div>
        <textarea
          v-model="store.config.policy_rules"
          class="field-textarea"
          placeholder="Ex: Répondre uniquement en français. Ne jamais donner de conseils médicaux. Respecter le RGPD."
          rows="4"
        />
      </section>

    </div>

    <div v-if="saved" class="toast">✓ Configuration sauvegardée</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useJudgeStore } from '@/stores/judge'

const store = useJudgeStore()
const saved = ref(false)
const showAddUseCase = ref(false)
const showAddCriterion = ref(false)

const newUseCase = ref({ label: '', description: '' })
const newCriterion = ref({ label: '', description: '' })

async function save() {
  await store.saveConfig()
  saved.value = true
  setTimeout(() => { saved.value = false }, 2500)
}

function toggleChatVisible(id: string) {
  if (!store.config) return
  const idx = store.config.visible_in_chat.indexOf(id)
  if (idx >= 0) {
    store.config.visible_in_chat.splice(idx, 1)
  } else {
    store.config.visible_in_chat.push(id)
  }
}

function addUseCase() {
  if (!store.config || !newUseCase.value.label) return
  const id = newUseCase.value.label.toLowerCase().replace(/\s+/g, '_')
  store.config.use_cases.push({ id, ...newUseCase.value })
  newUseCase.value = { label: '', description: '' }
  showAddUseCase.value = false
}

function addCriterion() {
  if (!store.config || !newCriterion.value.label) return
  const id = newCriterion.value.label.toLowerCase().replace(/\s+/g, '_')
  store.config.criteria.push({
    id,
    ...newCriterion.value,
    enabled: true,
    weight: 1.0,
  })
  newCriterion.value = { label: '', description: '' }
  showAddCriterion.value = false
}

onMounted(store.fetchConfig)
</script>

<style scoped>
.settings-view { padding: 28px; display: flex; flex-direction: column; gap: 28px; max-width: 800px; }

.page-header { display: flex; align-items: center; justify-content: space-between; }
.page-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; }

.save-btn {
  background: var(--accent);
  border: none;
  border-radius: 6px;
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.15s;
  font-weight: 500;
}
.save-btn:hover:not(:disabled) { background: #33eaff; }
.save-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.save-btn.saving { opacity: 0.6; }

/* Sections */
.settings-section {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header { display: flex; flex-direction: column; gap: 4px; }
.section-title { font-size: 10px; letter-spacing: 1.5px; color: var(--text-dim); }
.section-desc { font-size: 12px; color: var(--text-muted); }

/* Fields */
.field-select, .field-input {
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 8px 12px;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}
.field-select:focus, .field-input:focus { border-color: var(--accent); }

.field-textarea {
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 10px 12px;
  outline: none;
  resize: vertical;
  line-height: 1.6;
  width: 100%;
  transition: border-color 0.15s;
}
.field-textarea:focus { border-color: var(--accent); }
.field-textarea::placeholder { color: var(--text-dim); }

.field-label { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block; }

/* Use cases */
.use-cases-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px; }

.use-case-btn {
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.15s;
}
.use-case-btn:hover { border-color: var(--accent); }
.use-case-btn.active {
  background: var(--accent-dim);
  border-color: var(--accent);
}
.uc-label { font-size: 12px; color: var(--text); font-weight: 500; }
.uc-desc { font-size: 10px; color: var(--text-dim); line-height: 1.4; }
.use-case-add .uc-label { color: var(--text-dim); }

/* Criteria */
.criteria-list { display: flex; flex-direction: column; gap: 2px; }

.criterion-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 6px;
  transition: background 0.1s;
}
.criterion-row:hover { background: var(--bg-3); }
.criterion-row.disabled { opacity: 0.45; }

.criterion-left { display: flex; align-items: center; gap: 12px; flex: 1; }
.criterion-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }

.criterion-info { display: flex; flex-direction: column; gap: 2px; }
.criterion-label { font-size: 12px; color: var(--text); }
.criterion-desc { font-size: 11px; color: var(--text-dim); }

/* Toggle switch */
.toggle { position: relative; cursor: pointer; }
.toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
.toggle-track {
  display: block;
  width: 32px;
  height: 18px;
  background: var(--bg-4);
  border: 1px solid var(--border);
  border-radius: 9px;
  transition: all 0.2s;
  position: relative;
}
.toggle-track::after {
  content: '';
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--text-dim);
  transition: all 0.2s;
}
.toggle input:checked + .toggle-track { background: var(--accent-dim); border-color: var(--accent); }
.toggle input:checked + .toggle-track::after { left: 16px; background: var(--accent); }

/* Weight input */
.weight-control { display: flex; align-items: center; gap: 6px; }
.weight-label { font-size: 10px; color: var(--text-dim); }
.weight-input {
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 3px 6px;
  width: 52px;
  outline: none;
  text-align: center;
}
.weight-input:disabled { opacity: 0.3; }

/* Chat toggle */
.chat-toggle { display: flex; align-items: center; gap: 4px; cursor: pointer; }
.chat-toggle input { display: none; }
.chat-toggle-label {
  font-size: 10px;
  color: var(--text-dim);
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 8px;
  transition: all 0.15s;
  cursor: pointer;
}
.chat-toggle input:checked ~ .chat-toggle-label {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-dim);
}

/* Add criterion button */
.add-criterion-btn {
  background: none;
  border: 1px dashed var(--border);
  border-radius: 6px;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.15s;
  margin-top: 4px;
}
.add-criterion-btn:hover { border-color: var(--accent); color: var(--accent); }

/* Add form */
.add-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px;
  margin-top: 4px;
}

.add-form-actions { display: flex; gap: 8px; justify-content: flex-end; }

.btn-primary {
  background: var(--accent);
  border: none;
  border-radius: 5px;
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 6px 14px;
  cursor: pointer;
}

.btn-secondary {
  background: none;
  border: 1px solid var(--border);
  border-radius: 5px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 6px 14px;
  cursor: pointer;
}

/* Thresholds */
.thresholds-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.threshold-field { display: flex; flex-direction: column; gap: 6px; }

/* Toast */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--bg-3);
  border: 1px solid var(--green);
  border-radius: 8px;
  color: var(--green);
  font-size: 12px;
  padding: 10px 18px;
  animation: fadeIn 0.2s ease;
}

/* States */
.loading-state { display: flex; justify-content: center; padding: 60px 0; }
.loading-dots { display: flex; gap: 6px; }
.loading-dots span {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  animation: bounce 1.2s ease infinite;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bounce {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50% { transform: translateY(-6px); opacity: 1; }
}
</style>