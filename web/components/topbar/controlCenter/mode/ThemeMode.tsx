import { Moon, Sun } from 'lucide-react'
import ModeItem from './ModeItem'

// 这个组件就是切换 Light/Dark的，所以不需要isDark判断了
interface Props {
	isDark: boolean
	val: boolean
	setVal: (val: boolean) => void
}

const ThemeMode = ({ isDark, val, setVal }: Props) => (
	<ModeItem
		// TODO: 控制中心窗口会莫名其妙关闭，失效
		title={isDark ? 'Dark Mode' : 'Light Mode'}
		isDark={isDark}
		val={val}
		setVal={setVal}
		Icon={val ? <Moon size={16} /> : <Sun size={16} />}
	/>
)

export default ThemeMode
