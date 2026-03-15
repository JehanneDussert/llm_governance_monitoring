<template>
  <div class="chat-view">
    <div class="chat-header">
      <div class="header-left">
        <h1 class="page-title">Chat</h1>
        <div class="model-selector">
          <select v-model="store.currentModel" class="model-select">
            <optgroup label="SLMs">
              <option value="ollama/qwen2.5:1.5b">qwen2.5 1.5b</option>
              <option value="ollama/gemma3:1b">gemma3 1b</option>
              <option value="ollama/llama3.2:3b">llama3.2 3b</option>
              <option value="ollama/deepseek-r1:1.5b">deepseek-r1 1.5b</option>
            </optgroup>
          </select>
        </div>
      </div>
      <div class="header-stats" v-if="store.lastLatency">
        <div class="stat-pill">
          <span class="stat-label">latency</span>
          <span class="stat-value" :class="latencyClass">{{ store.lastLatency }}ms</span>
        </div>
        <div class="stat-pill" v-if="store.tokensPerSecond">
          <span class="stat-label">tokens/s</span>
          <span class="stat-value accent">{{ store.tokensPerSecond }}</span>
        </div>
      </div>
      <button class="clear-btn" @click="store.clearMessages" v-if="store.messages.length">
        clear
      </button>
    </div>

    <div class="messages" ref="messagesEl">
      <div v-if="!store.messages.length" class="empty-state">
        <div class="empty-icon">◈</div>
        <p>Send a message to start monitoring</p>
        <p class="empty-sub">Responses will be traced in Langfuse and scored by the local judge</p>
      </div>

      <template v-for="(msg, i) in store.messages" :key="i">
        <div class="message" :class="msg.role">
          <div class="message-role">{{ msg.role }}</div>
          <div class="message-content">
            <span v-if="msg.role === 'assistant' && store.isStreaming && i === store.messages.length - 1">
              {{ msg.content }}<span class="cursor" />
            </span>
            <span v-else>{{ msg.content }}</span>
          </div>
        </div>

        <!-- Score async sous chaque message assistant terminé -->
        <!-- key stable = traceId pour éviter remontage -->
        <MessageScore
          v-if="msg.role === 'assistant' && msg.traceId && msg.content && (!store.isStreaming || i < store.messages.length - 1)"
          :key="msg.traceId"
          :trace-id="msg.traceId"
          :model="msg.model ?? store.currentModel"
          :question="msg.question ?? ''"
          :answer="msg.content"
        />
      </template>
    </div>

    <div class="input-area">
      <div class="input-wrapper">
        <textarea
          v-model="input"
          class="chat-input"
          placeholder="Ask something..."
          rows="1"
          @keydown.enter.exact.prevent="send"
          @input="autoResize"
          ref="inputEl"
          :disabled="store.isStreaming"
        />
        <button class="send-btn" @click="send" :disabled="store.isStreaming || !input.trim()">
          <span v-if="store.isStreaming" class="streaming-indicator">▪▪▪</span>
          <span v-else>↑</span>
        </button>
      </div>
      <div class="input-hint">↵ send · model: {{ store.currentModel }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import MessageScore from '@/components/MessageScore.vue'

const store = useChatStore()
const input = ref('')
const messagesEl = ref<HTMLElement>()
const inputEl = ref<HTMLTextAreaElement>()

const latencyClass = computed(() => {
  if (!store.lastLatency) return ''
  if (store.lastLatency < 3000) return 'green'
  if (store.lastLatency < 8000) return 'yellow'
  return 'red'
})

async function send() {
  if (!input.value.trim() || store.isStreaming) return
  const msg = input.value.trim()
  input.value = ''
  if (inputEl.value) {
    inputEl.value.style.height = 'auto'
  }
  await store.sendMessage(msg)
}

function autoResize(e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 200) + 'px'
}

watch(() => store.messages.length, async () => {
  await nextTick()
  messagesEl.value?.scrollTo({ top: messagesEl.value.scrollHeight, behavior: 'smooth' })
})
</script>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-2);
  flex-shrink: 0;
}

.header-left { display: flex; align-items: center; gap: 16px; flex: 1; }

.page-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text); }

.model-select {
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
  outline: none;
}
.model-select:focus { border-color: var(--accent); }

.header-stats { display: flex; gap: 8px; }

.stat-pill {
  display: flex; align-items: center; gap: 6px;
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 11px;
}
.stat-label { color: var(--text-dim); }
.stat-value { color: var(--text); }
.stat-value.accent { color: var(--accent); }
.stat-value.green { color: var(--green); }
.stat-value.yellow { color: var(--yellow); }
.stat-value.red { color: var(--red); }

.clear-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 5px 12px;
  cursor: pointer;
  transition: all 0.15s;
}
.clear-btn:hover { border-color: var(--red); color: var(--red); }

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.empty-state {
  margin: auto;
  text-align: center;
  color: var(--text-dim);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.empty-icon { font-size: 32px; color: var(--accent); opacity: 0.4; margin-bottom: 8px; }
.empty-sub { font-size: 11px; color: var(--text-dim); }

.message {
  display: flex;
  gap: 16px;
  animation: fadeIn 0.2s ease;
  margin-top: 16px;
}
.message.user { flex-direction: row-reverse; }

.message-role {
  font-size: 10px;
  letter-spacing: 1px;
  color: var(--text-dim);
  padding-top: 4px;
  width: 60px;
  flex-shrink: 0;
  text-align: right;
}
.message.user .message-role { text-align: left; color: var(--accent); opacity: 0.7; }

.message-content {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 16px;
  line-height: 1.6;
  max-width: 680px;
  white-space: pre-wrap;
  word-break: break-word;
}
.message.user .message-content {
  background: var(--accent-dim);
  border-color: rgba(0, 229, 255, 0.2);
}

.cursor {
  display: inline-block;
  width: 8px; height: 14px;
  background: var(--accent);
  margin-left: 2px;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}

.input-area {
  padding: 20px 28px 24px;
  border-top: 1px solid var(--border);
  background: var(--bg-2);
  flex-shrink: 0;
}

.input-wrapper { display: flex; gap: 10px; align-items: flex-end; }

.chat-input {
  flex: 1;
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 12px 16px;
  resize: none;
  outline: none;
  line-height: 1.5;
  transition: border-color 0.15s;
}
.chat-input:focus { border-color: var(--accent); }
.chat-input:disabled { opacity: 0.5; cursor: not-allowed; }
.chat-input::placeholder { color: var(--text-dim); }

.send-btn {
  width: 40px; height: 40px;
  background: var(--accent);
  border: none;
  border-radius: 8px;
  color: var(--bg);
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
  display: flex; align-items: center; justify-content: center;
}
.send-btn:hover:not(:disabled) { background: #33eaff; }
.send-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.streaming-indicator { font-size: 10px; letter-spacing: 2px; animation: pulse 1s ease infinite; }

.input-hint { margin-top: 6px; font-size: 10px; color: var(--text-dim); letter-spacing: 0.3px; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
</style>