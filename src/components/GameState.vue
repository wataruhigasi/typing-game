<template>
    <div>
        <ul>
            <li class="text-center">
                <figure class="mb-3">
                <img class="mx-auto" :src="require(`@/assets/${selectedCharacterData.photo}.jpg`)" alt="" width="193" height="130">
                </figure>
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
        console.log('photo', selectedCharacterData.value.photo)
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
.typing-text::before {
    content: "";
    position: absolute;
    height: 100%;
    display: inline-block;
    width: .2rem;
    background-color: theme('colors.gray.300');
    transform: translateX(-.5em);
    animation: flash .5s alternate infinite;
}
</style>