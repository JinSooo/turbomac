import useChatStore from '@/stores/chat'
import dayjs from '@/utils/date'
import Image from 'next/image'

interface Props {
	isDark: boolean
}

const Chat = ({ isDark }: Props) => {
	const messages = useChatStore(state => state.messages)
	const lastMessage = messages.at(-1)!
	const styles = {
		hover: isDark ? 'hover:bg-white/10' : 'hover:bg-[#f5f5f5]',
		font: isDark ? '' : 'text-black',
		text: isDark ? '' : 'text-gray-400',
	}

	return (
		<div className={`flex w-full p-2  h-[70px] ${styles.hover}`}>
			<div className="p-2 rounded-full">
				<Image src="/img/ui/avatar.jpg" width={50} height={50} alt="qq" />
			</div>

			<div className="flex flex-col justify-center w-full">
				<div className="flex">
					<div className={styles.font}>TurboRoom</div>
					<div className="flex-1 h-full"></div>
					<div className="text-sm truncate w-[40px] text-[#5e5e5e] ">
						{dayjs(new Date(lastMessage?.createAt ?? 0))
							.format('HH:mm')
							.toString()}
					</div>
				</div>
				<p className={`text-sm truncate w-[130px] text-[#5e5e5e] ${styles.text}`}>
					{lastMessage?.user?.username}:{lastMessage?.content}
				</p>
			</div>
		</div>
	)
}

export default Chat
