<template>
    <div>
        <ul>
            <li class="text-center">
                <h2 class="font-bold text-2xl">{{ selectedCharacterData.name }}</h2>
                <p class="relative mt-4 font-bold text-xl typing-text" :class="{valid: isValid}">{{selectedCharacterData.romaji.toLocaleUpperCase()}}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { inject, defineComponent } from 'vue'

import TypingKey from '@/result/Typing-key'
import { TypingStore } from '@/result/Typing'

export default defineComponent({
    setup() {
        console.log('Aa')
        const { isValid, selectedCharacterData, getKeycode, startTimer } = inject(TypingKey) as TypingStore
        startTimer()
        document.addEventListener('keypress', getKeycode)
        return {
            isValid,
            selectedCharacterData
        }
    }
})
</script>

<style scoped>
.valid::first-letter{
    @apply text-red-600 font-bold
}
</style>