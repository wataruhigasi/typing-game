import { ComputedRef, ToRefs } from 'vue'
// type phaseProps = 'IDLE' | 'START' | 'FINISHED'

interface InputObject {
    name: string,
    romaji: string,
}

interface StateProps {
    characterData: InputObject[]
}

type ReturnStateProps = {
    // phase: phaseProps
    selectedCharacterData: ComputedRef<InputObject>
    // isValid: boolean
} & ToRefs<StateProps>

export {InputObject, StateProps, ReturnStateProps}