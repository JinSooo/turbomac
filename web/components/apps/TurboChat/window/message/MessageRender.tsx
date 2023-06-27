import useUserStore from '@/stores/user'
import { Message } from '@/types'
import Text from '../messagetype/Text'
import { AnimatePresence, motion } from 'framer-motion'
import TimeRender from './TimeRender'
import MessageInfo from './MessageInfo'

interface Props {
	isDark: boolean
	messages: Message[]
}

const MessageRender = ({ messages, isDark }: Props) => {
	const userInfo = useUserStore(state => state.userInfo)

	const renderMessage = (message: Message) => {
		switch (message.type) {
			case 'text':
				return <Text message={message} isSelf={message.userId === userInfo?.id} />
		}
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
								duration: 1,
							},
						}}
						key={message.id}
					>
						<TimeRender prevMessage={index > 0 ? messages[index - 1] : null} message={message} />
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
