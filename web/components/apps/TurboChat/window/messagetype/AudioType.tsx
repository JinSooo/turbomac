import { Message } from '@/types'

interface Props {
	message: Message
}

const AudioType = ({ message }: Props) => {
	return (
		<a href={message.content}>
			<div className="flex my-2 rounded-lg overflow-hidden">
				<audio src={message.content} controls className="w-[300px]" />
			</div>
		</a>
	)
}

export default AudioType
