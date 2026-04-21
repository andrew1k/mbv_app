<template>
  <v-card variant="text" rounded="0" max-width="600" class="mx-auto">
    <v-card class="ma-2 pa-2">
      <VProgressLinear indeterminate v-if="isSubmitting"/>
      <v-card-title>Зарегистрироваться</v-card-title>
      <v-form @submit.prevent="submit">
        <vTextField
          label="Имя"
          v-model="firstName"
          :error-messages="firstNameError"
          @blur="firstNameBlur"
        />
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
        <vTextField
          label="Email"
          v-model="email"
          :error-messages="eError"
          @blur="eBlur"
        />
        <vTextField
          label="Пароль"
          v-model="password"
          :error-messages="pError"
          @blur="pBlur"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ?'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        />
        <v-radio-group
          label="Ваш пол"
          v-model="personGender"
          :error-messages="personGenderError"
          @blur="personGenderBlur"
          inline
        >
          <vRadio label="Мужской" value="male"/>
          <vRadio label="Женский" value="female"/>
        </v-radio-group>
        <v-checkbox
          v-model="acceptCheckbox"
          color="primary"
          density="compact"
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
const {value: firstName, errorMessage: firstNameError, handleBlur: firstNameBlur} = useField('firstName',
  yup
    .string()
    .min(2)
    .required('Это поле обязательно')
    .max(32),
)
const {value: secondName, errorMessage: secondNameError, handleBlur: secondNameBlur} = useField('secondName',
  yup
    .string()
    .min(2)
    .required('Это поле обязательно')
    .max(32),
)
const {value: phoneNumber, errorMessage: phoneNumberError, handleBlur: phoneNumberBlur} = useField('phoneNumber',
  yup
    .number()
    .required('Это поле обязательно'),
)
const {value: birthDate, errorMessage: birthDateError, handleBlur: birthDateBlur} = useField('birthDate',
  yup
    .date()
    .required('Это поле обязательно'),
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

const {value: personGender, errorMessage: personGenderError, handleBlur: personGenderBlur} = useField('personGender',
  yup.string().required('Это поле обязательно'),
)

const submit = handleSubmit(async values => {
  await appSignup({...values}, additionalCheckbox)
})
</script>
