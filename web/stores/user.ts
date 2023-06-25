import { UserInfo } from '@/types'
import { create } from 'zustand'

interface State {
	token: string
	userInfo: UserInfo | null
}

interface Action {
	setToken: (token: string) => void
	setUserInfo: (userInfo: UserInfo) => void
}

const useUserStore = create<State & Action>(set => ({
	token: '',
	userInfo: null,
	setToken: token => set(() => ({ token: token })),
	setUserInfo: userInfo => set(() => ({ userInfo: userInfo })),
}))

export default useUserStore
