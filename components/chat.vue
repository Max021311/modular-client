<template>
    <div class="chat-container">
      <div class="chat-messages" ref="chatMessages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="message.sender === 'user' ? 'user-message' : 'bot-message'"
        >
          <p>{{ message.text }}</p>
        </div>
      </div>
      <div class="chat-input">
        <input
          type="text"
          v-model="input"
          @keydown.enter="sendMessage"
          placeholder="Escribe tu mensaje..."
        />
        <button @click="sendMessage">Enviar</button>
      </div>
    </div>
  </template>
  
  <script>
  import { v4 as uuidv4 } from 'uuid'; // Para generar IDs de sesión únicos
  
  export default {
    data() {
      return {
        messages: [],
        input: '',
        sessionId: uuidv4(), // Genera un ID de sesión único al crear el componente
      };
    },
    methods: {
      async sendMessage() {
        if (this.input.trim() === '') return;
  
        const userMessage = { text: this.input, sender: 'user' };
        this.messages.push(userMessage);
        this.input = '';
  
        try {
          const response = await $fetch('/api/dialogflow', {
            method: 'POST',
            body: {
              text: userMessage.text,
              sessionId: this.sessionId,
            },
          });
  
          const botMessage = { text: response.response, sender: 'bot' };
          this.messages.push(botMessage);
        } catch (error) {
          const errorMessage = {
            text:
              'Hubo un error al comunicarse con el chatbot. Por favor, inténtalo de nuevo.',
            sender: 'bot',
          };
          this.messages.push(errorMessage);
          console.error('Error al enviar mensaje a Dialogflow:', error);
        }
      },
    },
    watch: {
      messages() {
        // Hacer scroll al final de los mensajes cuando se agrega uno nuevo
        this.$nextTick(() => {
          this.$refs.chatMessages.scrollTop =
            this.$refs.chatMessages.scrollHeight;
        });
      },
    },
  };
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
  