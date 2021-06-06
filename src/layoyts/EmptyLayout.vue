<template>
    <div class="app-main-layout">
    <main class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>
</div>
</template>

<script>
export default {
  name: 'homeLayout',
   mounted() {
   
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  }
}
</script>