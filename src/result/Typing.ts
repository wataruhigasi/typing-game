import { computed, reactive, toRefs } from 'vue'

import { StateProps, ReturnStateProps } from '@/interface'
import { characterData } from '@/constants'

export const Typing = (): ReturnStateProps => {
    const defaultState: StateProps = {
        isValid: false,
        characterData: JSON.parse(JSON.stringify(characterData)),
        phase: 'IDLE',
        timer: 0,
        timerId: null,
        missTypingCount: 0,
        typingCount: 0,
    }
    console.log(characterData)
    const state = reactive<StateProps>({ ...defaultState })
    const randomNumber = computed(() => Math.floor(Math.random() * state.characterData.length))
    const selectedCharacterData = computed(() => state.characterData[randomNumber.value])
    console.log('selectedCharacterData', selectedCharacterData)
    const getKeycode = (event: KeyboardEvent) => {
        const keycode = event.key
        const splitCharacterDataRomaji = selectedCharacterData.value.romaji.split('')
        if (keycode === splitCharacterDataRomaji[0]) {
            state.typingCount++
            state.isValid = false
            state.characterData[randomNumber.value].romaji = selectedCharacterData.value.romaji.slice(1)
            if (!selectedCharacterData.value.romaji.length) {
                state.characterData.splice(randomNumber.value, 1)
                if (!state.characterData.length) {
                    state.phase = 'FINISHED'
                    document.removeEventListener('keypress',getKeycode)
                }
            }
        } else {
            state.isValid = true
            state.missTypingCount++
        }
        console.log('キーボード入力受け取り', keycode)
    }
    const startTimer = () => {
        state.timerId = setInterval(() => {
            state.timer++
        },1000)
    }
    const typingResult = computed(() => {
        const sum = state.typingCount + state.missTypingCount
        return Math.round((state.typingCount / sum) * 100)
    })
    return {
        ...toRefs(state),
        selectedCharacterData,
        getKeycode,
        startTimer,
        typingResult,
    }
}

export type TypingStore = ReturnType<typeof Typing>
