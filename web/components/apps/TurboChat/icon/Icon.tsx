import Image from 'next/image'
import { useState } from 'react'

interface Props {
	isDark: boolean
	name?: string
	desc?: string
	onClick?: () => void
}

const Icon: React.FC<Props> = ({ isDark, name, desc, onClick }) => {
	const [isHover, setIsHover] = useState(false)
	const styles = {
		bg: isDark ? 'bg-[#262626] ' : 'bg-[#fff] text-black',
		img: isHover
			? `/chat/chatwindow/${name}_fill.svg`
			: isDark
			? `/chat/chatwindow/${name}.svg`
			: `/chat/chatwindow/${name}_dark.svg`,
	}

	return (
		<div
			className="rounded-lg h-[46px] flex-center relative px-[5px] tooltip tooltip-bottom"
			data-tip={desc}
			onClick={onClick}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Image src={styles.img} width={20} height={20} alt="chatappicon" />
		</div>
	)
}

export default Icon
