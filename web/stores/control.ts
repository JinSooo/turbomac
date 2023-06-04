import { create } from 'zustand'

interface State {
	date: Date
	isWife: boolean
	showControlCenter: boolean
	showWifiMenu: boolean
	showAppleIconMenu: boolean
}

interface Action {
	setIsWifi: (val: boolean) => void
	setShowControlCenter: (val: boolean) => void
	setShowWifiMenu: (val: boolean) => void
	setShowAppleIconMenu: (val: boolean) => void
}

const useControlStore = create<State & Action>(set => ({
	date: new Date(),
	isWife: true,
	showControlCenter: false,
	showWifiMenu: false,
	showAppleIconMenu: false,

	setIsWifi: val => set(() => ({ isWife: val })),
	setShowAppleIconMenu: val => set(() => ({ showAppleIconMenu: val })),
	setShowWifiMenu: val => set(() => ({ showWifiMenu: val })),
	setShowControlCenter: val => set(() => ({ showControlCenter: val })),
}))

export default useControlStore
