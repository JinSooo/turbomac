import { ActiveUser, Message } from '@/types'
import { create } from 'zustand'

interface State {
	messages: Message[]
	activeUsers: ActiveUser[]
	page: number
	sentFlag: boolean
}

interface Action {
	setSentFlag: (sentFlag: boolean) => void
	setMessages: (messages: Message[]) => void
	setActiveUsers: (activeUsers: ActiveUser[]) => void
	setPage: (page: number) => void
}

const useChatStore = create<State & Action>(set => ({
	messages: [],
	activeUsers: [],
	page: 1,
	sentFlag: false,

	setActiveUsers: activeUsers => set(() => ({ activeUsers: activeUsers })),
	setMessages: messages => set(() => ({ messages: messages })),
	setSentFlag: sentFlag => set(() => ({ sentFlag: sentFlag })),
	setPage: page => set(() => ({ page: page })),
}))

export default useChatStore
