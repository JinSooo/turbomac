import useChatStore from '@/stores/chat'
import useSocketStore from '@/stores/socket'
import useThemeStore from '@/stores/theme'
import useUserStore from '@/stores/user'
import { useEffect } from 'react'
import io from 'socket.io-client'
import SideBar from './sidebar/SideBar'
import ChatList from './chatlist/ChatList'
import Window from './window/Window'

const TurboChat = () => {
	const [isDark] = useThemeStore(state => [state.isDark])
	const [userInfo] = useUserStore(state => [state.userInfo])
	const [socket, setSocket] = useSocketStore(state => [state.socket, state.setSocket])
	const [messages, setMessages, setActiveUsers, setIsAll] = useChatStore(state => [
		state.messages,
		state.setMessages,
		state.setActiveUsers,
		state.setIsAll,
	])

	useEffect(() => {
		const host = 'http://localhost:8081'
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
			setActiveUsers(data)
		})
		newSocket.on('getMessages', data => {
			// TODO: 暂时先这样处理
			// 15为一次获取的消息个数
			if (data.length < 15) setIsAll(true)
			else {
				messages.unshift(...data)
				setMessages(messages)
			}
		})
		newSocket.on('addMessage', data => {
			messages.push(data)
			setMessages(messages)
		})

		return () => {
			newSocket?.disconnect()
		}
	}, [])

	return (
		<div className="flex h-full backdrop-blur-sm">
			<SideBar isDark={isDark} />
			<ChatList isDark={isDark} />
			{socket && <Window isDark={isDark} />}
		</div>
	)
}

export default TurboChat
