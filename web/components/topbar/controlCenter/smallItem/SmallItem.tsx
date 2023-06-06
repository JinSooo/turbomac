import { getColorByTheme } from '@/utils/theme'
import { LucideIcon } from 'lucide-react'
import { useMemo } from 'react'

interface Props {
	title: string
	Icon: LucideIcon
	val: boolean
	setVal: (val: boolean) => void
	click?: () => void // 用于点击val值改变时，需处理的逻辑（如fullscreen组件的话，处理的逻辑就是点击全屏）
}

/**
 * 用于控制面板的小组件，如WIFI、Bluetooth等
 */
const SmallItem = ({ title, Icon, val, setVal, click }: Props) => {
	const handleClick = () => {
		click && click()
		setVal(!val)
	}

	const style = useMemo(
		() => ({
			bgColor: val ? 'bg-primary' : 'bg-gray-300',
			content: val ? 'On' : 'Off',
			iconColor: getColorByTheme(val),
		}),
		[val],
	)

	return (
		<div className="flex p-2 space-x-2 h-1/3" onClick={handleClick}>
			<div className={`w-8 h-8 rounded-full flex-center ${style.bgColor}`}>
				<Icon size={16} color={style.iconColor} />
			</div>
			<div className="space-y-1 leading-3">
				<p>{title}</p>
				<p>{style.content}</p>
			</div>
		</div>
	)
}

export default SmallItem
