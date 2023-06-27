import { ActiveUser, Message } from '@/types'
import { create } from 'zustand'

interface State {
	messages: Message[]
	activeUsers: ActiveUser[]
	sentFlag: boolean
	isAll: boolean
}

interface Action {
	setSentFlag: (sentFlag: boolean) => void
	setMessages: (messages: Message[]) => void
	setActiveUsers: (activeUsers: ActiveUser[]) => void
	setIsAll: (isAll: boolean) => void
}

const useChatStore = create<State & Action>(set => ({
	messages: [],
	activeUsers: [],
	sentFlag: false,
	isAll: false,

	setActiveUsers: activeUsers => set(() => ({ activeUsers: activeUsers })),
	setMessages: messages => set(() => ({ messages: messages })),
	setSentFlag: sentFlag => set(() => ({ sentFlag: sentFlag })),
	setIsAll: isAll => set(() => ({ isAll: isAll })),
}))

export default useChatStore
