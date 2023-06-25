import { useState } from 'react'
import Chat from './Chat'
import Search from './Search'

interface Props {
	isDark: boolean
}

const ChatList = ({ isDark }: Props) => {
	const [isHover, setIsHover] = useState(false)
	const styles = {
		bg: isDark ? 'bg-[#262626] ' : 'bg-white',
	}

	return (
		<div className={`w-[250px] flex flex-col select-none ${styles.bg}`}>
			<div className="w-full h-4 "></div>
			<Search isDark={isDark} />
			<div
				className={`w-full h-[566px] overflow-y-scroll overflow-x:hidden scroll-smooth ${isHover ? 'chatlist_' : 'chatlist'}`}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<Chat isDark={isDark} />
			</div>
		</div>
	)
}

export default ChatList
