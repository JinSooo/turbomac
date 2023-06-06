import { create } from 'zustand'

interface State {
	date: Date
	wifi: boolean
	bluetooth: boolean
	fullscreen: boolean
	showControlCenter: boolean
	showWifiMenu: boolean
	showAppleIconMenu: boolean
}

interface Action {
	setWifi: (val: boolean) => void
	setBluetooth: (val: boolean) => void
	setFullScreen: (val: boolean) => void
	setShowControlCenter: (val: boolean) => void
	setShowWifiMenu: (val: boolean) => void
	setShowAppleIconMenu: (val: boolean) => void
}

const useControlStore = create<State & Action>(set => ({
	date: new Date(),
	wifi: true,
	bluetooth: true,
	fullscreen: false,
	showControlCenter: false,
	showWifiMenu: false,
	showAppleIconMenu: false,

	setWifi: val => set(() => ({ wifi: val })),
	setBluetooth: val => set(() => ({ bluetooth: val })),
	setFullScreen: val => set(() => ({ fullscreen: val })),
	setShowAppleIconMenu: val => set(() => ({ showAppleIconMenu: val })),
	setShowWifiMenu: val => set(() => ({ showWifiMenu: val })),
	setShowControlCenter: val => set(() => ({ showControlCenter: val })),
}))

export default useControlStore
