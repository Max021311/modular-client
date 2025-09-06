// server/api/dialogflow.js
import { SessionsClient } from '@google-cloud/dialogflow'

const projectId = 'ssplus-assistant-srwn' // Reemplaza con tu ID del proyecto de Google Cloud
const privateKey = (process.env.DIALOGFLOW_CLIENT_EMAIL ?? '').replace(/\\n/g, '\n') // Desde las variables de entorno
const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL ?? '' // Desde las variables de entorno
const languageCode = 'es' // O el idioma que estés utilizando

// Inicializa el cliente de Dialogflow
const sessionClient = new SessionsClient({
  credentials: {
    private_key: privateKey,
    client_email: clientEmail
  }
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const text = body.text
  const sessionId = body.sessionId // Deberías generar un ID de sesión único por usuario

  // Crea la ruta de la sesión
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId)

  // Define la consulta de texto
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: languageCode
      }
    }
  }

  try {
    // Envía la solicitud a Dialogflow
    const responses = await sessionClient.detectIntent(request)
    const result = responses[0].queryResult

    // Devuelve la respuesta de Dialogflow
    return {
      response: result.fulfillmentText,
      intent: result.intent?.displayName || 'Unknown',
      confidence: result.intentDetectionConfidence
    }
  } catch (error) {
    console.error('Error al llamar a Dialogflow:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al comunicarse con Dialogflow'
    })
  }
})
