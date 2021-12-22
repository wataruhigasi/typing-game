import { ComputedRef, ToRefs } from 'vue'

interface InputObject {
    name: string,
    romaji: string,
}

interface StateProps {
    characterData: InputObject[]
}

type ReturnStateProps = {
    selectedCharacterData: ComputedRef<InputObject>
} & ToRefs<StateProps>

export {InputObject, StateProps, ReturnStateProps}