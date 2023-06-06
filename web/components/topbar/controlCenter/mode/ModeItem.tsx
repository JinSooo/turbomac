import { getFontColorByTheme } from '@/utils/theme'
import { useMemo } from 'react'

interface Props {
	title: string
	isDark: boolean
	val: boolean
	setVal: (val: boolean) => void
	Icon: JSX.Element
}

const ModeItem = ({ title, isDark, val, setVal, Icon }: Props) => {
	const styles = useMemo(
		() => ({
			bgItemColor: isDark ? 'bg-[#2d3440]/90 border-gray-500' : 'bg-white/50',
			bgIconColor: val ? 'bg-primary' : 'bg-gray-400',
			font: getFontColorByTheme(isDark),
		}),
		[isDark, val],
	)

	return (
		<div className={`flex p-3 py-4 rounded-[13px] h-16 border shadow ${styles.bgItemColor}`} onClick={() => setVal(!val)}>
			<div className={`w-8 h-8 flex-center rounded-full ${styles.bgIconColor}`}>{Icon}</div>
			<h2 className={`align-middle py-[5px] pl-2 font-medium ${styles.font}`}>{title}</h2>
		</div>
	)
}

export default ModeItem
