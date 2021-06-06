<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import EmptyLayout from './layoyts/EmptyLayout'
import MainLayout from './layoyts/MainLayout'
export default {
  name: 'app',
  data() {
    return {
      info: ''
    }
  },
  components: {
     EmptyLayout,
     MainLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
}
</script>