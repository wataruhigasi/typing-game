import { ComputedRef, ToRefs } from 'vue'
type phaseProps = 'IDLE' | 'START' | 'FINISHED'

interface InputObject {
    name: string,
    romaji: string,
}

interface StateProps {
    isValid: boolean
    characterData: InputObject[]
    phase: phaseProps
    timer: number
    timerId: any
}

type ReturnStateProps = {
    selectedCharacterData: ComputedRef<InputObject>
    getKeycode: (event: KeyboardEvent) => void
    startTimer: () => void
    timerId: any
} & ToRefs<StateProps>

export {InputObject, StateProps, ReturnStateProps, phaseProps}