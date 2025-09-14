<template>
  <div>
    <div class="hero min-h-screen">
      <div class="hero-content flex-col">
        <div class="card bg-base-300 text-base-content w-full max-w-md shadow-2xl">
          <h2 class="text-3xl font-bold text-base-content text-center mt-7">
            Registro
          </h2>
          <form
            v-if="careersStatus === 'success'"
            class="card-body w-full min-w-[400px]"
            @submit.prevent="handleSubmit"
          >
            <AtomsInputText
              id="code"
              v-model="code"
              label="Código"
              type="text"
              pattern="[0-9]{9}"
              placeholder="Código"
              required
              :error="errors.code !== undefined"
              :helper-text="errors.code"
              @change="validate"
            />
            <AtomsInputText
              id="name"
              v-model="name"
              label="Nombre"
              type="text"
              placeholder="Nombre"
              required
              :error="errors.name !== undefined"
              :helper-text="errors.name"
              @change="validate"
            />
            <AtomsSelect
              id="career"
              v-model="career"
              :options="careerOptions"
              label="Carrera"
              placeholder="Carrera"
              required
              :error="errors.career !== undefined"
              :helper-text="errors.career"
              @change="validate"
            />
            <AtomsInputText
              id="password"
              v-model="password"
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              required
              :error="errors.password !== undefined"
              :helper-text="errors.password"
              @change="validate"
            />
            <AtomsInputText
              id="password-confirm"
              v-model="passwordConfirm"
              label="Confirmar contraseña"
              type="password"
              placeholder="Confirmar contraseña"
              required
              :error="errors.password_confirm !== undefined"
              :helper-text="errors.password_confirm"
              @change="validate"
            />
            <AtomsInputText
              id="phone"
              v-model="phone"
              label="Teléfono"
              type="tel"
              placeholder="Teléfono"
              required
              :error="errors.phone !== undefined"
              :helper-text="errors.phone"
              @change="validate"
            />
            <div
              v-if="addStudentError"
              class="alert alert-error mt-4"
            >
              <span v-if="'statusCode' in addStudentError && addStudentError.statusCode === 409">Estos datos ya están registrados</span>
              <span v-else>{{ 'Error al registrar estudiante' }}</span>
            </div>
            <div class="mt-6">
              <button
                type="submit"
                :disabled="isSubmitDisabled"
                class="btn btn-primary w-full font-bold"
              >
                <span
                  v-if="addStudentPending"
                  class="loading loading-spinner loading-sm"
                />
                {{ addStudentPending ? 'Registrando...' : 'Registrar' }}
              </button>
            </div>
          </form>
          <div
            v-else
            class="loading loading-spinner"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Joi from 'joi'

const route = useRoute()
const token = computed(() => route.query.token as string ?? null)

if (token.value === null) {
  navigateTo('/')
}

const errors = ref<Record<string, string>>({})
const code = ref('')
const name = ref('')
const career = ref<number | string>('')
const password = ref('')
const passwordConfirm = ref('')
const phone = ref('')

const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Nombre es requerido',
    'string.empty': 'Nombre es requerido'
  }),
  code: Joi.string().pattern(/^[0-9]{9}$/).required().messages({
    'any.required': 'Código es requerido',
    'string.empty': 'Código es requerido',
    'string.pattern.base': 'Código debe tener 9 dígitos'
  }),
  career: Joi.number().required().messages({
    'any.required': 'Carrera es requerida',
    'number.base': 'Escoge una carrera'
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Teléfono es requerido',
    'string.empty': 'Teléfono es requerido'
  }),
  password: Joi.string().required().min(6).messages({
    'any.required': 'Contraseña es requerida',
    'string.min': 'Contraseña debe tener minimo 6 caracteres',
    'string.empty': 'Contraseña es requerido'
  }),
  password_confirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Las contraseñas no son iguales',
    'string.empty': 'Confirmar contraseña es requerido',
    'any.required': 'Confirmar contraseña es requerido'
  })
})

function validate() {
  const result = schema.validate({
    name: name.value,
    code: code.value,
    career: career.value,
    phone: phone.value,
    password: password.value,
    password_confirm: passwordConfirm.value
  }, {
    abortEarly: false
  })

  const errorMessages: Record<string, string> = {}
  result.error?.details.forEach((e) => {
    const key = e.context?.key
    console.log({ key, message: e.message })
    if (key === undefined) return
    errorMessages[key] = e.message
  })

  errors.value = errorMessages
}

const { data: careers, status: careersStatus } = useFetchCareers()

const careerOptions = computed(() => {
  return careers.value?.map(career => ({
    value: career.id,
    label: career.name
  })) ?? []
})

const { data: studentData, error: addStudentError, pending: addStudentPending, mutate: addStudent } = useAddStudent()

const isSubmitDisabled = computed(() => {
  return careersStatus.value !== 'success' || Object.keys(errors.value).length > 0 || addStudentPending.value
})

const handleSubmit = async () => {
  if (Object.keys(errors.value).length > 0) {
    return
  }

  try {
    await addStudent({
      code: code.value,
      name: name.value,
      password: password.value,
      careerId: Number(career.value),
      telephone: phone.value
    }, token.value)

    if (studentData.value) {
      // Redirect to success page or show success message
      navigateTo('/sign-in')
    }
  } catch (error) {
    console.error('Error adding student:', error)
    // The error is already captured in addStudentError reactive ref
  }
}
</script>
