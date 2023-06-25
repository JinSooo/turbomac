import { Message } from '@/types'
import Image from 'next/image'

interface Props {
	isDark: boolean
	isSelf: boolean
	message: Message
	children?: JSX.Element
}

const MessageInfo = ({ isDark, isSelf, message, children }: Props) => {
	return (
		<div className={`p-[3px] flex space-x-2 ${isSelf ? 'justify-end' : ''}`}>
			{!isSelf && (
				<div className="my-2 rounded-full overflow-hidden">
					<Image src={'/img/ui/avatar.jpg'} width={45} height={45} alt="qq" />
				</div>
			)}
			<div className={`flex flex-col ${isSelf ? 'items-end' : ''}`}>
				<p className={`${isDark ? '' : 'text-black'} ${message?.user?.role === 'owner' && 'text-yellow-300'}`}>
					{message?.user?.username}
					{message?.user?.role === 'owner' && ' 👑'}
				</p>
				{children}
			</div>
			{isSelf && (
				<div className="my-2 rounded-full overflow-hidden">
					<Image src={'/img/ui/good.jpg'} width={45} height={45} alt="qq" />
				</div>
			)}
		</div>
	)
}

export default MessageInfo
