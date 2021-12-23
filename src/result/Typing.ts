import { computed, reactive, toRefs } from 'vue'

import { StateProps, ReturnStateProps } from '@/interface'
import { characterData } from '@/constants'

export const Typing = (): ReturnStateProps => {
    const defaultState: StateProps = {
        isValid: false,
        characterData: JSON.parse(JSON.stringify(characterData)),
        phase: 'IDLE',
    }
    console.log(characterData)
    const state = reactive<StateProps>({ ...defaultState })
    const randomNumber = computed(() => Math.floor(Math.random() * state.characterData.length))
    const selectedCharacterData = computed(() => state.characterData[randomNumber.value])
    console.log('selectedCharacterData', selectedCharacterData)
    const getKeycode = (event: KeyboardEvent) => {
        const keycode = event.key
        const splitCharacterDataRomaji = selectedCharacterData.value.name.split('')
        if (keycode === splitCharacterDataRomaji[0]) {
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
            state.isValid = false
        }
        console.log('キーボード入力受け取り', keycode)
    }
    return {
        ...toRefs(state),
        selectedCharacterData,
        getKeycode,
    }
}

export type TypingStore = ReturnType<typeof Typing>
