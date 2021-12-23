<template>
    <div>
        <template v-if="!count">
            <div class="mt-8 text-center">
            <button type="button" class="font-bold app-btn" @click="countDown">タイピングを始める</button>
            </div>
        </template>
        <p class="mt-4 text-center text-red-400 text-9xl font-bold" v-else>
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