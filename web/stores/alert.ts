import { create } from 'zustand'

export enum AlertType {
	SUCCESS,
	INFO,
	WARNING,
	ERROR,
}

interface State {
	isShow: boolean
	type: AlertType
	content: string
	duration: number
}

interface Action {
	setShow: (isShow: boolean) => void
	alert: (type: AlertType, content: string, duration?: number, isShow?: boolean) => void
}

const useAlertStore = create<State & Action>(set => ({
	isShow: false,
	type: AlertType.INFO,
	content: '',
	duration: 2000,

	setShow: isShow =>
		set(() => ({
			isShow: isShow,
		})),
	alert: (type, content, duration = 2000, isShow = true) =>
		set(() => ({
			type,
			content,
			duration,
			isShow,
		})),
}))

export default useAlertStore
