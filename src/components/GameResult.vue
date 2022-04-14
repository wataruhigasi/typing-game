<template>
    <section>
        <h2 class="text-xl font-bold">結果</h2>
        <table class="mt-8 w-full table-auto">
            <thead>
                <tr class="bg-blue-400 text-white">
                    <th class="py-2">タイピング数</th>
                    <th class="border-l border-white py-2">ミスタイピング数</th>
                    <th class="border-l border-white py-2">正打率</th>
                    <th class="border-l border-white py-2">タイム</th>
                </tr>
            </thead>
            <tbody>
            <tr class="bg-gray-200">
                <td class="text-center py-2">{{ typingCount }}回</td>
                <td class="text-center py-2 border-l border-white">{{ missTypingCount }}回</td>
                <td class="text-center py-2 border-l border-white">{{ typingResult }}%</td>
                <td class="text-center py-2 border-l border-white">{{ timer }}秒</td>
            </tr>
        </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

import TypingKey from '@/result/Typing-key'
import { TypingStore } from '@/result/Typing'

export default defineComponent({
    setup () {
        const { typingCount, missTypingCount, typingResult, timer, timerId } = inject(TypingKey) as TypingStore
        console.log('timer', timer)
        clearInterval(timerId.value)

        return {
            typingCount,
            missTypingCount,
            typingResult,
            timer,
        }
    }
})
</script>