import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)

firebase.initializeApp({
  apiKey: "AIzaSyD0-bVykghy_NhlnBb3R8mEeEBSsSH-PYM",
  authDomain: "front-vue-verst.firebaseapp.com",
  projectId: "front-vue-verst",
  storageBucket: "front-vue-verst.appspot.com",
  messagingSenderId: "801359379118",
  appId: "1:801359379118:web:2df7ae7506431b66758b3f"
})

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})

