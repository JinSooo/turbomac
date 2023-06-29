import Image from 'next/image'
import { Message } from '@/types'

interface Props {
	isDark: boolean
	message: Message
}

const DocumentType = ({ isDark, message }: Props) => {
	const fileName = message.content.split('/').at(-1)!
	const originalName = fileName.split('-').at(-1)!
	const fileType = fileName.split('.').at(-1)!
	const styles = {
		bg: isDark ? 'bg-[#262626] ' : 'bg-white',
		font: isDark ? 'text-blue-300' : 'text-black',
	}

	return (
		<a href={message.content} target="_blank">
			<div className={`flex p-2 my-2 w-[250px] rounded-lg ${styles.bg}`}>
				<div className="flex flex-col flex-1">
					<p className={`w-[150px] truncate pl-2 ${styles.font}`}>{originalName}</p>
					<p className="pl-2">{message.size}</p>
				</div>
				<Image className="pr-1" src={`/chat/file/${fileType}.png`} width={52} height={50} alt="file_icon"></Image>
			</div>
		</a>
	)
}

export default DocumentType
