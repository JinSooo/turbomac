import useChatStore from '@/stores/chat'
import { useClickAway } from 'ahooks'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import Icon from '../icon/Icon'
import GroupMembers from './group/GroupMembers'

interface Props {
	isDark: boolean
}

const Header = ({ isDark }: Props) => {
	// 显示当前在线人数
	const activeUsers = useChatStore(state => state.activeUsers)
	const divRef = useRef<HTMLDivElement>(null)
	const [isShow, setIsShow] = useState(false)
	const styles = {
		bg: isDark ? 'bg-[#1a1a1a]' : 'bg-[#f2f2f2]',
		font: isDark ? '' : 'text-black',
	}

	useClickAway(() => setIsShow(false), divRef)
	const handleClick = () => setIsShow(!isShow)

	return (
		<>
			<div className="h-6"></div>
			<motion.header className="flex-center">
				{/* 房间在线人数 */}
				<div className={`text-base ml-4 font-black ${styles.font}`}>TurboRoom{` (${activeUsers.length})`}</div>
				<div className="flex-1"></div>
				<div className="relative flex mr-2 space-x-2">
					<div>
						<Icon isDark={isDark} name="more" onClick={handleClick} />
					</div>
					{isShow && (
						<motion.div
							className={`absolute overflow-hidden top-10 left-[-150px]  z-10 flex flex-col w-[177px] ${styles.bg}`}
							initial={{ opacity: isShow ? 0 : 1 }}
							animate={{ opacity: isShow ? 1 : 0 }}
							transition={{ duration: 0.3 }}
							ref={divRef}
						>
							<GroupMembers isDark={isDark} activeUsers={activeUsers} />
						</motion.div>
					)}
				</div>
			</motion.header>
		</>
	)
}

export default Header
