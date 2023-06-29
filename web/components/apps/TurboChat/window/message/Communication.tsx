import useChatStore from '@/stores/chat'
import useSocketStore from '@/stores/socket'
import { debounce } from '@/utils'
import { useEffect, useRef, useState } from 'react'
import MessageRender from './MessageRender'

interface Props {
	isDark: boolean
}

const Communication = ({ isDark }: Props) => {
	const socket = useSocketStore(state => state.socket)
	const [messages, sentFlag, isAll] = useChatStore(state => [state.messages, state.sentFlag, state.isAll])
	const chatListRef = useRef<HTMLDivElement>(null)
	const [prevScrollTop, setPrevScrollTop] = useState(0)
	const [loading, setLoading] = useState(false)
	const [isHover, setIsHover] = useState(false)
	const styles = {
		border: isDark ? 'border-[#232323]' : 'border-[#e9e9e9]',
	}

	// 页面更新，即向上请求数据，更新messages
	const getMessages = () => {
		if (chatListRef.current) {
			const chatList = chatListRef.current
			socket && socket.emit('getMessages', { count: messages.length })
			setLoading(false)
			// 保证数据更新后，定位到原本的数据位置
			setTimeout(() => {
				chatList.scrollTop = chatList.scrollHeight - prevScrollTop
			}, 100)
		}
	}

	const handleScroll = debounce(() => {
		if (chatListRef.current) {
			const chatList = chatListRef.current
			setPrevScrollTop(chatList.scrollHeight)

			// 当滚动到顶部时，请求更新消息
			if (chatList.scrollTop < 50 && !isAll) {
				setLoading(true)
				// 呈现等待动画
				setTimeout(() => getMessages(), 300)
			}
		}
	}, 300)

	// 发送消息后，自动滚动到末尾
	useEffect(() => {
		if (chatListRef.current) {
			const chatList = chatListRef.current
			// 等message更新后
			setTimeout(() => {
				chatList.scrollTop = 9999
			}, 250)
		}
	}, [sentFlag])

	// 一开始滚动到末尾
	useEffect(() => {
		if (chatListRef.current) {
			const chatList = chatListRef.current
			setTimeout(() => {
				chatList.scrollTop = 9999
			}, 250)
		}
		console.log(messages)
	}, [])

	/**
	 * TODO: 滚动的判定问题，对方是否应该在更新消息时自动滚动（但如果对方在看某条消息，滚动会导致问题）
	 */

	return (
		<div
			ref={chatListRef}
			className={`flex-1 h-[420px] overflow-y-scroll overflow-x-hidden scroll-smooth border-t ${styles.border} ${
				isHover ? 'chatlist_' : 'chatlist'
			}`}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			onScroll={handleScroll}
		>
			<div className="flex flex-col w-full">
				{/* 滚动加载动画 */}
				{loading && (
					<div className="flex-center mt-2">
						<span className="loading loading-dots loading-md"></span>
					</div>
				)}
				{/* 消息 */}
				<MessageRender isDark={isDark} messages={messages} />
			</div>
		</div>
	)
}

export default Communication
