import { Eye, EyeOff } from 'lucide-react'
import ModeItem from './ModeItem'

// 这个组件就是切换 Light/Dark的，所以不需要isDark判断了
interface Props {
	isDark: boolean
	val: boolean
	setVal: (val: boolean) => void
	brightness: number
	setBrightness: (val: number) => void
}

const EyeMode = ({ isDark, val, setVal, brightness, setBrightness }: Props) => {
	const handleClick = () => {
		if (val) {
			setBrightness(brightness << 1)
		} else {
			setBrightness(brightness >> 1)
		}
		setVal(!val)
	}

	return (
		<ModeItem
			title={'Eye Mode'}
			isDark={isDark}
			val={val}
			setVal={handleClick}
			Icon={val ? <Eye size={16} /> : <EyeOff size={16} />}
		/>
	)
}

export default EyeMode
