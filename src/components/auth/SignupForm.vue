<template>
  <v-card variant="text" rounded="0" max-width="600" class="mx-auto">
    <v-card class="ma-2 pa-2">
      <VProgressLinear indeterminate v-if="isSubmitting"/>
      <v-card-title>Зарегистрироваться</v-card-title>
      <v-form @submit.prevent="submit">
        <!-- Required Fields -->
        <div class="text-caption text-medium-emphasis mb-2">Обязательные поля *</div>
        
        <vTextField
          label="Имя *"
          v-model="firstName"
          :error-messages="firstNameError"
          @blur="firstNameBlur"
          required
        />
        <vTextField
          label="Email *"
          v-model="email"
          :error-messages="eError"
          @blur="eBlur"
          required
        />
        <vTextField
          label="Пароль *"
          v-model="password"
          :error-messages="pError"
          @blur="pBlur"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ?'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          required
        />

        <!-- Optional Fields -->
        <div class="text-caption text-medium-emphasis mb-2 mt-4">Дополнительная информация (опционально)</div>
        
        <vTextField
          label="Фамилия"
          v-model="secondName"
          :error-messages="secondNameError"
          @blur="secondNameBlur"
        />
        <VTextField
          label="Ваш номер телефона"
          v-model="phoneNumber"
          :error-messages="phoneNumberError"
          @blur="phoneNumberBlur"
          prefix="+7"
          counter="10"
        />
        <vTextField
          label="День рождения"
          v-model="birthDate"
          :error-messages="birthDateError"
          @blur="birthDateBlur"
          type="date"
        />

        <!-- Agreement -->
        <v-checkbox
          v-model="acceptCheckbox"
        >
          <template v-slot:label>
            <div>
              Я согласен с
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <a
                    target="_blank"
                    href="https://mbv.spb.ru/agreement/"
                    v-bind="props"
                    @click.stop
                  >
                    Политикой конфиденциальности
                  </a>
                  и
                  <a
                    target="_blank"
                    href="https://mbv.spb.ru/processing-regulation/"
                    v-bind="props"
                    @click.stop
                  >
                    Положением об обработке персональных данных
                  </a>
                </template>
                Откроется в новом браузерном окне
              </v-tooltip>
              персональных данных
            </div>
          </template>
        </v-checkbox>
        <v-btn class="my-2" block size="x-large" type="submit" :disabled="!acceptCheckbox" :loading="isSubmitting">Создать Аккаунт</v-btn>
        <v-btn class="mt-4" block size="large" variant="outlined" to="/auth/login">Войти</v-btn>
      </v-form>
    </v-card>
  </v-card>
</template>

<script setup>
import {ref} from 'vue'
import {useAuthStore} from '@/store/auth.store'
import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

const {appSignup} = useAuthStore()

let showPassword = ref(false)
let acceptCheckbox = ref(false)
const additionalCheckbox = ref(['familyStatus', 'baptism', 'churchMembership', 'churchSteps', 'churchServs'])
const showAll = ref(true)

const {handleSubmit, isSubmitting} = useForm()

// Required fields
const {value: firstName, errorMessage: firstNameError, handleBlur: firstNameBlur} = useField('firstName',
  yup
    .string()
    .trim()
    .required('Это поле обязательно')
    .min(2, 'Минимум 2 символа')
    .max(32, 'Максимум 32 символа'),
)

const {value: email, errorMessage: eError, handleBlur: eBlur} = useField('email',
  yup
    .string()
    .trim()
    .required('Поле email должно быть заполнено')
    .email('Введите валидный email'),
)

const {value: password, errorMessage: pError, handleBlur: pBlur} = useField('password',
  yup
    .string()
    .trim()
    .required('Это поле должно быть заполнено')
    .min(6, 'Это поле должно иметь не менее 6 символов')
    .max(32, 'Не должно иметь более 32 символов'),
)

// Optional fields
const {value: secondName, errorMessage: secondNameError, handleBlur: secondNameBlur} = useField('secondName',
  yup
    .string()
    .trim()
    .min(2, 'Минимум 2 символа')
    .max(32, 'Максимум 32 символа')
    .nullable(),
)

const {value: phoneNumber, errorMessage: phoneNumberError, handleBlur: phoneNumberBlur} = useField('phoneNumber',
  yup
    .string()
    .matches(/^[0-9]{0,10}$/, 'Только цифры, максимум 10 символов')
    .nullable(),
)

const {value: birthDate, errorMessage: birthDateError, handleBlur: birthDateBlur} = useField('birthDate',
  yup
    .date()
    .typeError('Введите корректную дату')
    .nullable(),
)

const submit = handleSubmit(async values => {
  await appSignup({...values}, additionalCheckbox)
})
</script>
