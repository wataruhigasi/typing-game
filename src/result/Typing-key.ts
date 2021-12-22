import { InjectionKey } from 'vue'
import { TypingStore } from '@/result/Typing'

const TypingKey: InjectionKey<TypingStore> = Symbol('TypingStore')

export default TypingKey