import { getFontColorByTheme } from '@/utils/theme'
import { Moon, Sun } from 'lucide-react'
import { useMemo } from 'react'
import ModeItem from './ModeItem'

// 这个组件就是切换 Light/Dark的，所以不需要isDark判断了
interface Props {
	isDark: boolean
	val: boolean
	setVal: (val: boolean) => void
}

const ThemeMode = ({ isDark, val, setVal }: Props) => (
	<ModeItem
		// TODO：title改变会导致窗口关闭，失效，目前先改变为静态的
		// title={isDark ? 'Dark Mode' : 'Light Mode'}
		title={'Theme Mode'}
		isDark={isDark}
		val={val}
		setVal={setVal}
		Icon={val ? <Moon size={16} /> : <Sun size={16} />}
	/>
)

export default ThemeMode
