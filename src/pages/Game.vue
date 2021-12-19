<template>
    <div class="w-full">
        <GameBotton />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import GameBotton from '@/components/GameBotton.vue'

export default defineComponent({
    name: 'App',
    components: {
        GameBotton
    },
})
</script>