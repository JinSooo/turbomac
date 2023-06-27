import useChatStore from '@/stores/chat'
import { useClickAway } from 'ahooks'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import Icon from '../icon/Icon'

interface Props {
	isDark: boolean
}

const Header = ({ isDark }: Props) => {
	// 显示当前在线人数
	const activeUsers = useChatStore(state => state.activeUsers)
	const styles = {
		bg: isDark ? 'bg-[#1a1a1a]' : 'bg-[#f2f2f2]',
		font: isDark ? '' : 'text-black',
	}

	return (
		<>
			<div className="h-6"></div>
			<motion.header className="flex-center">
				<div className={`text-base ml-4 font-black ${styles.font}`}>TurboRoom{` (${activeUsers.length})`}</div>
				<div className="flex-1"></div>
				<div className="relative flex mr-2 space-x-2">
					<div>
						<Icon isDark={isDark} name="more" />
					</div>
				</div>
			</motion.header>
		</>
	)
}

export default Header
