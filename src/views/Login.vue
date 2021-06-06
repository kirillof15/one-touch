<template>
  <v-container>
    <h2>Вход в личный кабинет</h2>
    <form>
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

      <v-btn
        :disabled="$v.$invalid"
        class="mr-4"
        @click="submit"
      >
        Войти
      </v-btn>

      <v-card-text class="center">
      У вас нет аккаунта?
      </v-card-text>

      <v-btn class="center">
      <router-link to="/registr">Зарегистрироваться!</router-link>
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
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'login',
    data: () => ({
        email: '',
        password: '',
        snackbar: false,
        textSnackbar: '',
        timeout: 2000,
    }),
    mixins: [validationMixin],
    validations: {
      password: { required, minLength: minLength(6) },
      email: { required, email },
    },
    computed: {
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
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const formData = {
                email: this.email,
                password: this.password
            }

            try {
                await this.$store.dispatch('login', formData)
                this.$router.push('/')
            } catch(e) {
                this.textSnackbar = e
                this.snackbar = true
            }

        }
    }
}
</script>

<style lang="scss">
    .card {
        max-width: 300px;
        margin: 60px auto;
    }
</style>