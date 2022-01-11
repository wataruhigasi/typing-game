<template>
    <div>
        <template v-if="!count">
            <figure>
                <img src="@/assets/background.png" width="10000" height="1000">
            </figure>
            <div class="position">
                <button type="button" class="font-bold app-btn" @click="countDown">タイピングを始める</button>
            </div>
        </template>
        <p class="mt-4 text-center text-blue-400 text-9xl font-bold" v-else>
        {{ count }}
        </p>
    </div>
</template>

<script lang="ts">
import { TypingStore } from '@/result/Typing'
import TypingKey from '@/result/Typing-key'
import { defineComponent , ref, inject} from 'vue'

export default defineComponent({
    setup () {
    const { phase } = inject(TypingKey) as TypingStore
    const count = ref<number>(0)
    const countDown = () => {
        count.value = 3
        const countInterval = setInterval(() => {
            count.value--
            if(!count.value){
                clearInterval(countInterval)
                phase.value = 'START'
                // provide('changeCss', phase.value)
            }
        },1000)
        console.log('countDown')
    }
    return{
        count,
        countDown
    }
    }
})
</script>

<style scoped>
.position {
    position: absolute; 
    left: 45%; 
    top: 46%;
}

</style>