<template>
  <div>
    <Header />
    <main class="py-12 max-w-screen-md mx-auto grid place-items-center">
      <Game />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Footer from '@/components/Footer.vue'
import Header from './components/Header.vue'
import Game from './pages/Game.vue'

  export default defineComponent({
  name: 'App',
  components: { Footer, Header, Game },
  pages: { Game },
  })
</script>

<style scoped>
main {
  height: calc(100vh - 90px);
}
</style>