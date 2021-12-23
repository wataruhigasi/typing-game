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
import { defineComponent , ref} from 'vue'
export default defineComponent({
    setup () {
    const count = ref<number>(0)
    const countDown = () => {
        count.value = 3
        const countInterval = setInterval(() => {
            count.value--
            if(!count.value){
                clearInterval(countInterval)
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