import { create } from 'zustand'

interface State {
	focusApp: string // 当前聚焦的app id
	maximizeApp: string // 最大化的app id
	minimizeApps: string[] // 所有缩小的app id
	displayApps: string[] // 所有打开的app id
}

interface Action {
	openApp: (id: string) => void
	closeApp: (id: string) => void
	setMaximizeApp: (id: string) => void
	setFocusApp: (id: string) => void
	addMinimizeApp: (id: string) => void
	removeMinimizeApp: (id: string) => void
}

const useAppsStore = create<State & Action>(set => ({
	maximizeApp: '',
	focusApp: '',
	minimizeApps: [],
	displayApps: [],

	openApp: id =>
		set(state => ({
			displayApps: state.displayApps.includes(id) ? [...state.displayApps] : [...state.displayApps, id],
		})),
	closeApp: id =>
		set(state => ({
			displayApps: state.displayApps.filter(app => app !== id),
		})),
	setMaximizeApp: id =>
		set(() => ({
			maximizeApp: id,
		})),
	setFocusApp: id =>
		set(() => ({
			focusApp: id,
		})),
	addMinimizeApp: id =>
		set(s => ({
			minimizeApps: [...s.minimizeApps, id],
		})),
	removeMinimizeApp: id =>
		set(s => ({
			minimizeApps: s.minimizeApps.filter(app => app !== id),
		})),
}))

export default useAppsStore
