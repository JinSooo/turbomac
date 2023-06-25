import useUserStore from '@/stores/user'
import { Message } from '@/types'
import Text from '../messagetype/Text'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import TimeRender from './TimeRender'
import MessageInfo from './MessageInfo'

interface Props {
	isDark: boolean
	lastChangedIndex: number
	setLastChangedIndex: (lastChangedIndex: number) => void
	messages: Message[]
	setMessages: (messages: Message[]) => void
}

const MessageRender = ({ messages, isDark, setMessages, lastChangedIndex, setLastChangedIndex }: Props) => {
	const userInfo = useUserStore(state => state.userInfo)
	const animatingMessages = messages.slice(lastChangedIndex)

	const renderMessage = (message: Message) => {
		switch (message.type) {
			case 'text':
				return <Text message={message} isSelf={message.userId === userInfo?.id} />
		}
	}
	const removeMessage = (e: React.MouseEvent, message: Message) => {
		e.preventDefault()
		setLastChangedIndex(messages.indexOf(message))
		setMessages(messages.filter(msg => msg.id !== message.id))
	}

	return (
		<ul className="w-full my-4">
			<AnimatePresence initial={false} mode="popLayout">
				{messages.map((message, index) => (
					<motion.li
						layout
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{
							opacity: { duration: 0.2 },
							layout: {
								type: 'spring',
								bounce: 0.4,
								duration: lastChangedIndex ? animatingMessages.indexOf(message) * 0.15 + 0.85 : 1,
							},
						}}
						key={message.id}
						id={`message-${message.id}`}
					>
						<TimeRender message={message} messages={messages} index={index} />
						<MessageInfo isDark={isDark} isSelf={message.userId === userInfo?.id} message={message}>
							{renderMessage(message)}
						</MessageInfo>
					</motion.li>
				))}
			</AnimatePresence>
		</ul>
	)
}

export default MessageRender
