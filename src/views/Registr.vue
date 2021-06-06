<template>
    <v-container>
      <h2>Личный кабинет</h2>
      <form class="mt-70">
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Имя"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        />

        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />

        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          label="Пароль"
          required
          type="password"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        />

        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Вы согласны?"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        />

        <v-btn
        :disabled="$v.$invalid"
        class="mr-4"
        @click="submit">
          Зарегистрироваться
        </v-btn>

        <v-card-text class="center mt-5">
          Уже есть аккаунт?
        </v-card-text>
        <v-btn class="center mt-5">
          <router-link to="/login">Войти!</router-link>
        </v-btn>
      </form>
      <div class="text-center">
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
        >
          {{ textSnackbar }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Закрыть
              </v-btn>
            </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>

import { validationMixin } from 'vuelidate'
import { required, maxLength, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'registr',
    data: () => ({
        email: '',
        password: '',
        name:'',
        checkbox: false,
        snackbar: false,
        textSnackbar: '',
        timeout: 2000,
    }),
    mixins: [validationMixin],
    validations: {
      name: { required, maxLength: maxLength(10) },
      password: { required, minLength: minLength(6) },
      email: { required, email },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },
    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('Нужно ваше согласие!')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Имя не должно быть больше 10 символов')
        !this.$v.name.required && errors.push('Нужно обязательно заполнить')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('пароль должен быть не меньше 6 символов')
        !this.$v.password.required && errors.push('Нужно обязательно заполнить')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Введите email')
        !this.$v.email.required && errors.push('Нужно обязательно заполнить')
        return errors
      },
    },
    methods: {
       async submit() {
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }

          const formData = {
            email: this.email,
            password: this.password,
            name: this.name
          }

          try {
            await this.$store.dispatch('register', formData)
            this.$router.push('/')
          } catch (e) {
            this.textSnackbar = e
            this.snackbar = true
          }
        }
    }
}
</script>
