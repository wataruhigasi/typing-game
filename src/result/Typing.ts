import { computed, reactive, toRefs } from 'vue'

import { StateProps, ReturnStateProps } from '@/interface'
import { characterData } from '@/constants'

export const Typing = (): ReturnStateProps => {
    const defaultState: StateProps = {
        characterData: JSON.parse(JSON.stringify(characterData))
    }
    console.log(characterData)
    const state = reactive<StateProps>({ ...defaultState })
    const randomNumber = computed(() => Math.floor(Math.random() * state.characterData.length))
    const selectedCharacterData = computed(() => state.characterData[randomNumber.value])
    console.log('selectedCharacterData', selectedCharacterData)
    return {
        ...toRefs(state),
        selectedCharacterData,
    }
}

export type TypingStore = ReturnType<typeof Typing>
