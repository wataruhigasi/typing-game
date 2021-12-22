<template>
    <div class="w-full">
        <GameBotton />
        <GameState />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import GameBotton from '@/components/GameBotton.vue'
import GameState from '@/components/GameState.vue'

export default defineComponent({
    name: 'App',
    components: {
        GameBotton,
        GameState,
    },
})
</script>