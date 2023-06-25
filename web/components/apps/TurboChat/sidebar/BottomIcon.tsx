import Image from 'next/image'
import { useState } from 'react'

interface Props {
	isDark: boolean
	name?: string
	onClick?: () => void
}

const BottomIcon = ({ isDark, name, onClick }: Props) => {
	const [isHover, setIsHover] = useState(false)
	const styles = {
		img: isHover ? `/chat/siderbar/${name}_fill.svg` : isDark ? `/chat/siderbar/${name}.svg` : `/chat/siderbar/${name}_dark.svg`,
	}

	return (
		<div
			className={'rounded-lg w-full h-[46px] flex-center'}
			onClick={() => onClick}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Image src={styles.img} width={30} height={30} alt="chatappicon" />
		</div>
	)
}

export default BottomIcon
