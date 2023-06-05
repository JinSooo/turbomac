import useThemeStore from '@/stores/theme'
import { useClickAway } from 'ahooks'
import { useRef } from 'react'
import { shallow } from 'zustand/shallow'
import WifiItem from './WifiItem'

interface Props {
	setMenuAway: () => void
}

const ControlCenter = ({ setMenuAway }: Props) => {
	const [isDark, setIsDark, brightness, setBrightness, sound, setSound] = useThemeStore(
		state => [state.isDark, state.setIsDark, state.brightness, state.setBrightness, state.sound, state.setSound],
		shallow,
	)
	const ref = useRef<HTMLDivElement>(null)

	const bgColor = isDark ? 'bg-[#1a2133]/90' : 'bg-white/40'
	const bgItemColor = isDark ? 'bg-[#2d3440]/90 border-gray-500' : 'bg-white/50'

	useClickAway(() => setMenuAway(), ref)

	return (
		<div ref={ref} className={`absolute p-3 select-none rounded-[13px] w-80 h-80 top-7 -left-72 flex flex-col shadow ${bgColor}`}>
			<div className="flex w-full">
				<div className={`flex flex-col mr-3 rounded-[13px] border shadow w-40 h-36 ${bgItemColor}`}>
					<WifiItem />
					<WifiItem />
					<WifiItem />
				</div>
			</div>
		</div>
	)
}

export default ControlCenter
