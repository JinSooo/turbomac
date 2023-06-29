import useChatStore from '@/stores/chat'
import useSocketStore from '@/stores/socket'
import useUserStore from '@/stores/user'
import { useRef, useState } from 'react'
import Icon from '../../icon/Icon'
import { useClickAway } from 'ahooks'
import EmojiPanel from './EmojiPanel'
import FileUpload from './FileUpload'

interface Props {
	isDark: boolean
}

const Input = ({ isDark }: Props) => {
	const socket = useSocketStore(state => state.socket)
	const userInfo = useUserStore(state => state.userInfo)
	const [sentFlag, setSentFlag] = useChatStore(state => [state.sentFlag, state.setSentFlag])
	const [content, setContent] = useState('')
	const [isHover, setIsHover] = useState(false)
	const [showEmojiPanel, setShowEmojiPanel] = useState(false)
	const emojiPanelRef = useRef<HTMLDivElement>(null)
	const styles = {
		bg: isDark ? 'bg-[#1a1a1a]' : 'bg-[#f2f2f2]',
		border: isDark ? 'border-[#232323]' : 'border-[#e9e9e9]',
		font: isDark ? '' : 'text-black',
	}

	useClickAway(() => setShowEmojiPanel(false), emojiPanelRef)

	const handleEnter = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			// 阻止与onChange事件相冲突
			e.preventDefault()

			socket &&
				socket.emit('createMessage', {
					message: content,
					userId: userInfo?.id,
				})
			setContent('')
			setSentFlag(!sentFlag)
		}
	}

	const handleEmoji = (emoji: string) => {
		setContent(content + emoji)
	}

	return (
		<div className="relative flex flex-col h-[170px]">
			{/* 表情面板 */}
			<div className="absolute bottom-[160px] w-full">
				{showEmojiPanel && <EmojiPanel ref={emojiPanelRef} isDark={isDark} handleEmoji={handleEmoji} />}
			</div>
			{/* 菜单栏 */}
			<div className={`flex h-[40px] space-x-2 border-t mx-4 ${styles.border}`}>
				<Icon isDark={isDark} name="smail" desc="表情" onClick={() => setShowEmojiPanel(true)} />
				<FileUpload isDark={isDark} userInfo={userInfo!} />
				<div className="flex-1"></div>
				<Icon isDark={isDark} name="record" desc="历史记录" />
			</div>
			{/* 输入框 */}
			<div className="flex-1 ">
				<textarea
					className={`w-full h-full px-3 py-2 overflow-y-scroll rounded-lg resize-none focus:outline-none focus:shadow-outline overflow-x:hidden scroll-smooth ${
						styles.bg
					} ${styles.font} ${isHover ? 'chatlist_' : 'chatlist'}`}
					value={content}
					onChange={e => setContent(e.target.value)}
					onKeyDown={handleEnter}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
				></textarea>
			</div>
		</div>
	)
}

export default Input
