<template>
  <div>
    <Header />
    <main class="py-12 max-w-screen-md mx-auto grid place-items-center">
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Footer from '@/components/Footer.vue'
import Header from './components/Header.vue'
  export default defineComponent({
  name: 'App',
  components: { Footer, Header },
  })
</script>

<style scoped>
main {
  height: calc(100vh - 90px);
}
</style>