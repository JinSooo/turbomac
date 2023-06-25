import type { Socket } from 'socket.io-client'
import { create } from 'zustand'

interface State {
	socket: Socket | null
}

interface Action {
	setSocket: (socket: Socket) => void
}

const useSocketStore = create<State & Action>(set => ({
	socket: null,
	setSocket: (socket: Socket) => set(() => ({ socket: socket })),
}))

export default useSocketStore
