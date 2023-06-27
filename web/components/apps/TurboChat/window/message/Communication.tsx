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
	const [messages, setMessages, page, setPage, sentFlag, maxPage] = useChatStore(state => [
		state.messages,
		state.setMessages,
		state.page,
		state.setPage,
		state.sentFlag,
		state.maxPage,
	])
	const chatListRef = useRef<HTMLDivElement>(null)
	const [prevScrollTop, setPrevScrollTop] = useState(0)
	const [loading, setLoading] = useState(false)
	const [isHover, setIsHover] = useState(false)
	const styles = {
		border: isDark ? 'border-[#232323]' : 'border-[#e9e9e9]',
	}

	const handleScroll = debounce(() => {
		if (chatListRef.current) {
			const chatList = chatListRef.current
			setPrevScrollTop(chatList.scrollHeight)

			// 当滚动到顶部时，请求更新消息
			if (chatList.scrollTop < 50 && page < maxPage) {
				setLoading(true)
				// 呈现等待动画
				setTimeout(() => {
					setPage(page + 1)
				}, 300)
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
			}, 100)
		}
	}, [sentFlag])

	// TODO: ???
	useEffect(() => {
		if (chatListRef.current) {
			const chatList = chatListRef.current
			console.log(messages, chatList.scrollHeight, chatList.scrollTop, chatList.scrollWidth)
			if (chatList.scrollHeight - chatList.scrollTop - chatList.scrollWidth < 100) {
				chatList.scrollTop = 9999
			}
		}
	}, [messages])

	// 页面更新，即向上请求数据，更新messages
	useEffect(() => {
		if (chatListRef.current && page > 0) {
			const chatList = chatListRef.current
			socket && socket.emit('getMessages', { page })
			setLoading(false)
			// 保证数据更新后，定位到原本的数据位置
			setTimeout(() => {
				chatList.scrollTop = chatList.scrollHeight - prevScrollTop
			}, 100)
		}
	}, [page])

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
				{loading && (
					<div className="flex-center mt-2">
						<span className="loading loading-dots loading-md"></span>
					</div>
				)}
				<MessageRender isDark={isDark} messages={messages} />
			</div>
		</div>
	)
}

export default Communication
