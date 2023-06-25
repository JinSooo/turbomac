import useChatStore from '@/stores/chat'
import useSocketStore from '@/stores/socket'
import useThemeStore from '@/stores/theme'
import useUserStore from '@/stores/user'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

const TurboChat = () => {
	const [isDark] = useThemeStore(state => [state.isDark])
	const [userInfo] = useUserStore(state => [state.userInfo])
	const [socket, setSocket] = useSocketStore(state => [state.socket, state.setSocket])
	const [setMessages, setActiveUsers] = useChatStore(state => [state.setMessages, state.setActiveUsers])

	useEffect(() => {
		const host = 'http://localhost:8080'
		const newSocket = io(host, {
			query: {
				id: userInfo?.id,
			},
		})
		setSocket(newSocket)

		newSocket.connect()
		newSocket.on('connect', () => {})
		newSocket.on('disconnect', () => {})
		newSocket.on('onlineUsers', data => {
			data && setActiveUsers(data)
		})
		newSocket.on('getMessages', data => {
			data && setMessages(data)
		})

		return () => {
			newSocket?.disconnect()
		}
	}, [])

	return <div className="flex h-full backdrop-blur-sm bg-gray-800">TurboChat</div>
	// return <div>TurboChat</div>
}

export default TurboChat
