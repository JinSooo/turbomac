import { create } from 'zustand'

interface State {
	isDark: boolean
	brightness: number
	sound: number
	color: string
	eyeMode: boolean
}

interface Action {
	setIsDark: (isDark: boolean) => void
	setBrightness: (brightness: number) => void
	setSound: (sound: number) => void
	setColor: (color: string) => void
	setEyeMode: (eyeMode: boolean) => void
}

const useThemeStore = create<State & Action>(set => ({
	isDark: false,
	brightness: 70,
	sound: 80,
	color: '#5388fc',
	eyeMode: false,

	setIsDark: isDark => set(() => ({ isDark: isDark })),
	setBrightness: brightness => set(() => ({ brightness: brightness })),
	setSound: sound => set(() => ({ sound: sound })),
	setColor: color => set(() => ({ color: color })),
	setEyeMode: eyeMode => set(() => ({ eyeMode: eyeMode })),
}))

export default useThemeStore
