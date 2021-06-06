<template>
    <v-container class="justify-center">
      <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-toolbar-title>Профиль</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text>
        <router-link style="color: #fff;" to="/login">Выйти</router-link>
      </v-btn>
    </v-app-bar>

      <v-card :loading="loading" class="pa-4">
        <v-card-title>Ваше имя</v-card-title>

      <v-card-subtitle>{{name}}</v-card-subtitle>

      <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Изменить имя"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        />

      <v-btn @click="updateName">Изменить</v-btn>
    </v-card>

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
import {mapGetters, mapActions} from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'profile',
  data() {
    return {
      loading: false,
      name: '',
      snackbar: false,
      textSnackbar: 'Имя успешно изменено',
      timeout: 2000,
    }
  },
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
  },
  computed: {
    ...mapGetters(['info']),
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Имя не должно быть больше 10 символов')
      !this.$v.name.required && errors.push('Нужно обязательно заполнить')
      return errors
    },
  },
  methods: {
    ...mapActions(['updateInfo']),
    async updateName() {
      try {
        if (this.$v.$invalid) {
        this.$v.$touch()
        return
        }

      await this.updateInfo({name: this.name})
      this.snackbar = true
      }catch(e) {
        this.textSnackbar = e
        this.snackbar = true
      }
    }
  },
  async mounted() {
    this.loading = true
    try {
      await this.$store.dispatch('fetchInfo')
      this.name = await this.info.name
    }
    finally {
      this.loading = false
    }
  }
}
</script>