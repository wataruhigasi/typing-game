<template>
    <div>
        <div class="right">
            <div class="size">
            <p>ストップウォッチ</p>
            </div>
            <div class="box17">
                    <div class="timer">
                        <div class="time">
                            <p style="text-align:right">
                                {{ timer }}秒
                            </p>
                        </div>
                    </div>
            </div>
        </div>
        <ul>
            <li class="text-center">
                <figure class="mb-3">
                <img class="mx-auto" :src="require(`@/assets/${selectedCharacterData.photo}.jpg`)" alt="" width="160" height="100">
                </figure>
                <h2 class="font-bold text-2xl">{{ selectedCharacterData.name }}</h2>
                <p class="relative mt-4 font-bold text-xl typing-text" :class="{valid: isValid}">{{selectedCharacterData.romaji.toLocaleUpperCase()}}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { inject, defineComponent, Ref } from 'vue'

import TypingKey from '@/result/Typing-key'
import { TypingStore } from '@/result/Typing'

export default defineComponent({
    setup() {
        const { isValid, selectedCharacterData, getKeycode, startTimer, timer, } = inject(TypingKey) as TypingStore
        console.log('photo', selectedCharacterData.value.photo)
        startTimer()
        document.addEventListener('keypress', getKeycode)
        return {
            isValid,
            selectedCharacterData,
            timer,
        }
    },
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
.time-result{
    font-size: 29px;
}
#timer {
    display: flex;
    align-items: center;
    justify-content: center;
}
.time {
    font-size: 50px;
}
.box17{
    margin:2em 0;
    position: relative;
    padding: 0.5em 1.5em;
    display:inline-block;
    border: 4mm ridge rgb(0, 140, 255)
}
.right {
    text-align: right;
}
.size {
    font-size: 30px;
}

</style>