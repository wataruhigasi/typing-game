<template>
    <div>
        <ul>
            <li class="text-center">
                <h2 class="font-bold text-2xl">{{ selectedCharacterData }}</h2>
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
        const { selectedCharacterData } = inject(TypingKey) as TypingStore
        console.log('be')
        return {
            selectedCharacterData
        }
    }
})
</script>

