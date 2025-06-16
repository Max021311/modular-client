<template>
  <div>
    <!-- Floating Message Button -->
    <button
      class="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition duration-300 ease-in-out z-50"
      @click="toggleChat"
    >
      <div class="w-8 h-8 rounded-full flex items-center justify-center mr-2 overflow-hidden">
        <img
          src="/logo-removebg-preview.png"
          alt="AI Assistant Logo"
          class="w-full h-full object-cover"
        >
      </div>
    </button>

    <!-- Chat Window -->
    <div
      v-if="isChatOpen"
      class="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col z-50 overflow-hidden"
    >
      <!-- Chat Header -->
      <div class="bg-gray-200 p-3 flex items-center">
        <div class="w-8 h-8 rounded-full flex items-center justify-center mr-2 overflow-hidden">
          <img
            src="/logo-removebg-preview.png"
            alt="AI Assistant Logo"
            class="w-full h-full object-cover"
          >
        </div>
        <h3 class="text-lg font-bold text-gray-700">
          SSS+ AI Assistant
        </h3>
      </div>

      <!-- Chat Messages Area -->
      <div
        ref="chatMessages"
        class="flex-1 p-4 overflow-y-auto"
      >
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['flex mb-4', message.sender === 'user' ? 'justify-end' : 'justify-start']"
        >
          <div
            :class="[
              'rounded-lg p-3 max-w-[70%]',
              message.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-300 text-gray-800'
            ]"
          >
            <p>{{ message.text }}</p>
          </div>
        </div>
      </div>

      <!-- Chat Input Area -->
      <div class="bg-white p-4 border-t border-gray-300 flex items-center">
        <input
          v-model="input"
          type="text"
          class="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
          placeholder="Escribe tu mensaje..."
          @keydown.enter="sendMessage"
        >
        <button
          class="bg-primary text-white rounded-full px-4 py-2 hover:bg-primary-dark transition duration-300 ease-in-out"
          @click="sendMessage"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* import { v4 as uuidv4 } from 'uuid' // Para generar IDs de sesión únicos

export default {
  data() {
    return {
      messages: [],
      input: '',
      sessionId: uuidv4(), // Genera un ID de sesión único al crear el componente
      isChatOpen: false // Data property to control chat window visibility
    }
  },
  watch: {
    messages() {
      // Hacer scroll al final de los mensajes cuando se agrega uno nuevo
      this.$nextTick(() => {
        this.$refs.chatMessages.scrollTop
            = this.$refs.chatMessages.scrollHeight
      })
    }
  },
  methods: {
    async sendMessage() {
      if (this.input.trim() === '') return

      const userMessage = { text: this.input, sender: 'user' }
      this.messages.push(userMessage)
      this.input = ''

      try {
        const response = await $fetch('/api/dialogflow', {
          method: 'POST',
          body: {
            text: userMessage.text,
            sessionId: this.sessionId
          }
        })

        const botMessage = { text: response.response, sender: 'bot' }
        this.messages.push(botMessage)
      } catch (error) {
        const errorMessage = {
          text:
              'Hubo un error al comunicarse con el chatbot. Por favor, inténtalo de nuevo.',
          sender: 'bot'
        }
        this.messages.push(errorMessage)
        console.error('Error al enviar mensaje a Dialogflow:', error)
      }
    },
    toggleChat() {
      this.isChatOpen = !this.isChatOpen
    }
  }
} */
</script>

  <style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
  }

  .chat-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background-color: #f9f9f9;
  }

  .user-message {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .user-message p {
    background-color: #dcf8c6;
    padding: 10px;
    border-radius: 10px;
    max-width: 80%;
    word-wrap: break-word;
  }

  .bot-message {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  .bot-message p {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 10px;
    max-width: 80%;
    word-wrap: break-word;
  }

  .chat-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
  }

  .chat-input input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  .chat-input button {
    padding: 8px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
