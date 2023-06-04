import { create } from 'zustand'

interface State {
	isDark: boolean
	brightness: number
	sound: number
	color: string
}

interface Action {
	setIsDark: (isDark: boolean) => void
	setBrightness: (brightness: number) => void
	setSound: (sound: number) => void
	setColor: (color: string) => void
}

const useThemeStore = create<State & Action>(set => ({
	isDark: false,
	brightness: 100,
	sound: 100,
	color: '#5388fc',

	setIsDark: isDark => set(() => ({ isDark: isDark })),
	setBrightness: brightness => set(() => ({ brightness: brightness })),
	setSound: sound => set(() => ({ sound: sound })),
	setColor: color => set(() => ({ color: color })),
}))

export default useThemeStore
