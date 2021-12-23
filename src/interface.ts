import { ComputedRef, ToRefs } from 'vue'
// type phaseProps = 'IDLE' | 'START' | 'FINISHED'

interface InputObject {
    name: string,
    romaji: string,
}

interface StateProps {
    isValid: boolean
    characterData: InputObject[]
}

type ReturnStateProps = {
    selectedCharacterData: ComputedRef<InputObject>
    getKeycode: (event: KeyboardEvent) => void
} & ToRefs<StateProps>

export {InputObject, StateProps, ReturnStateProps}