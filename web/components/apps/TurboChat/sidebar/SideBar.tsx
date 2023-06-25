import Image from 'next/image'
import TopIcon from './TopIcon'
import BottomIcon from './BottomIcon'

interface Props {
	isDark: boolean
}

const SideBar = ({ isDark }: Props) => {
	const styles = {
		bg: isDark ? 'bg-[#262626]' : 'bg-[#e4e4e5]',
	}

	return (
		<aside className={`h-full w-[66px] flex flex-col select-none ${styles.bg}`}>
			<div className="w-full h-7 "></div>
			<div className="my-4 flex-center">
				<Image src="/img/ui/good.jpg" width={35} height={35} alt="qqavatar" />
			</div>
			<div className="flex flex-col h-[160px] space-y-1">
				<TopIcon isDark={isDark} name="chat" />
				<TopIcon isDark={isDark} name="people" />
			</div>
			<div className="flex-1 w-full"></div>
			<div className="flex flex-col h-[160px] p-3 space-y-2 mb-3">
				<BottomIcon isDark={isDark} name="email" />
				<BottomIcon isDark={isDark} name="collect" />
				<BottomIcon isDark={isDark} name="menu" />
			</div>
		</aside>
	)
}

export default SideBar
