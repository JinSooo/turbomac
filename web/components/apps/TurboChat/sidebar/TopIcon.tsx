import Image from 'next/image'

interface Props {
	isDark: boolean
	name?: string
	onClick?: () => void
}

const TopIcon = ({ isDark, name, onClick }: Props) => {
	const styles = {
		hover: isDark ? 'hover:bg-white/10' : 'hover:bg-gray-300',
	}

	return (
		<div className={`rounded-lg w-full h-[46px] flex-center ${styles.hover}`} onClick={onClick}>
			<Image src={`/chat/siderbar/${name}_fill.svg`} width={30} height={30} alt="chatappicon" />
		</div>
	)
}

export default TopIcon
