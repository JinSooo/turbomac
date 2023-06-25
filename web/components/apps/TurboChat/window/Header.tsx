import useChatStore from '@/stores/chat'
import { useClickAway } from 'ahooks'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import Icon from '../icon/Icon'

interface Props {
	isDark: boolean
}

const Header = ({ isDark }: Props) => {
	const activeUsers = useChatStore(state => state.activeUsers)
	const motionDivRef = useRef<HTMLDivElement>(null)
	const [isShow, setIsShow] = useState(false)
	const styles = {
		bg: isDark ? 'bg-[#1a1a1a]' : 'bg-[#f2f2f2]',
		font: isDark ? '' : 'text-black',
	}

	const handleIconClick = () => setIsShow(!isShow)
	useClickAway(() => setIsShow(false), motionDivRef)

	return (
		<>
			<div className="h-6"></div>
			<motion.header className="flex-center">
				<div className={`text-base ml-4 font-black ${styles.font}`} onClick={handleIconClick}>
					TurboRoom{` (${activeUsers.length})`}
				</div>
				<div className="flex-1"></div>
				<div className="relative flex mr-2 space-x-2">
					<div>
						<Icon isDark={isDark} name="more" onClick={handleIconClick} />
					</div>
				</div>
			</motion.header>
		</>
	)
}

export default Header
