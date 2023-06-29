import emojiConfig from '@/config/emojiConfig'
import { motion } from 'framer-motion'
import { Ref, forwardRef } from 'react'

interface Props {
	isDark: boolean
	handleEmoji: (emoji: string) => void
}

const EmojiPanel = ({ isDark, handleEmoji }: Props, ref: Ref<HTMLDivElement>) => {
	const styles = {
		bg: isDark ? 'bg-[#060606]' : 'bg-[#fcfcfc]',
	}
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// @ts-ignore
		if (e.target.tagName === 'SPAN') handleEmoji(e.target.textContent)
	}

	return (
		<motion.div
			ref={ref}
			className={`w-3/4 overflow-y-scroll h-[200px] text-2xl flex-center flex-wrap chatlist ${styles.bg} shadow-xl p-2 rounded-xl`}
			initial={{ opacity: 0.3, scale: 1.1 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 1 }}
			onClick={e => handleClick(e)}
		>
			{emojiConfig.map((emoji, index) => (
				<span key={index} className="w-[37px] h-[33px] flex-center">
					{emoji}
				</span>
			))}
		</motion.div>
	)
}

export default forwardRef(EmojiPanel)
