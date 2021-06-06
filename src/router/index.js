import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'


Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/registr',
    name: 'registr',
    meta: {layout: 'empty'},
    component: () => import('../views/Registr.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

  router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireAuth = to.matched.some(record => record.meta.auth)
  
    if (requireAuth && !currentUser) {
      next('/login')
    } else {
      next()
    }
  })

export default router
