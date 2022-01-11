<template>
  <div>
    <Header />
    <main class=" max-w-screen-xl mx-auto grid place-items-center">
      <Game />
    </main>
    </div>
    <Footer />
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
    console.log('中身確認',Typing().phase.value)
    // const changeCss = () => {
    //   if(Typing().phase.value === 'IDLE'){
    //     return 'body'
    //   } else {
    //     return 'noclorbody'
    //   }
    // }
    // const Cssname = inject('changeCss')
    // console.log('cssName', Cssname)
  }
  })
</script>

<style scoped>
main {
  height: calc(100vh - 90px);
}
.body {
  background-image: url("~@/assets/background.png");
  background-size: 100% 100%;
}
.nobody {
  background-color: aliceblue;
}
</style>