import { Message } from '@/types'

interface Props {
	message: Message
}

const VideoType = ({ message }: Props) => {
	return (
		<a href={message.content}>
			<div className="flex my-2 rounded-lg overflow-hidden">
				<video src={message.content} controls className="w-[300px]" />
			</div>
		</a>
	)
}

export default VideoType
