import { create } from 'zustand'

export interface UserInfo {
	id: string
	username: string
	avatar: string
	role: string
	createAt?: Date
}

interface State {
	token: string
	userInfo?: UserInfo
}

interface Action {
	setToken: (token: string) => void
	setUserInfo: (userInfo: UserInfo) => void
}

const useUserStore = create<State & Action>(set => ({
	token: localStorage.getItem('turbomac_token') ?? '',
	userInfo: JSON.parse(localStorage.getItem('turbomac_userInfo') ?? '') as UserInfo,
	setToken: token => set(() => ({ token: token })),
	setUserInfo: userInfo => set(() => ({ userInfo: userInfo })),
}))

export default useUserStore
