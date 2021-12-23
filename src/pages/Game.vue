<template>
    <div class="w-full">
        <GameBotton v-if="phase === 'IDLE'" />
        <GameState  v-else-if="phase === 'START'" />
        <GameResult v-else/>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

import GameBotton from '@/components/GameBotton.vue'
import GameState from '@/components/GameState.vue'
import GameResult from '@/components/GameResult.vue'
import TypingKey from '@/result/Typing-key'
import { TypingStore } from '@/result/Typing'

export default defineComponent({
    name: 'App',
    components: {
        GameBotton,
        GameState,
        GameResult,
    },
    setup () {
        const {phase} = inject(TypingKey) as TypingStore
        return {
            phase
        }
    }
})
</script>