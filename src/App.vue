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
import { defineComponent, provide } from 'vue'
import Footer from '@/components/Footer.vue'
import Header from './components/Header.vue'
import Game from './pages/Game.vue'
import TypingKey from '@/result/Typing-key'
import { Typing } from '@/result/Typing'

  export default defineComponent({
  name: 'App',
  components: { Footer, Header, Game },
  pages: { Game },
  setup () {
    provide(TypingKey, Typing())
  }
  })
</script>

<style scoped>
main {
  height: calc(100vh - 90px);
}
</style>