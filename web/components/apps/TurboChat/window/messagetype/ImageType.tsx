import Image from 'next/image'
import { Message } from '@/types'

interface Props {
	message: Message
}

const ImageType = ({ message }: Props) => {
	return (
		<div className="my-2 rounded-lg overflow-hidden">
			<Image width={150} height={150} src={message.content} alt="msg_img" />
		</div>
	)
}

export default ImageType
