import { Message } from '@/types'

interface Props {
	message: Message
	isSelf: boolean
}

const TextType = ({ message, isSelf }: Props) => {
	return (
		<div className={`chat ${isSelf ? 'chat-end' : 'chat-start'}`}>
			<div className={`chat-bubble select-none ${isSelf ? 'chat-bubble-info' : 'chat-bubble-success'}`}>{message.content}</div>
		</div>
	)
}

export default TextType
