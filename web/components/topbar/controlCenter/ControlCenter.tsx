import useThemeStore from '@/stores/theme'
import { useClickAway } from 'ahooks'
import { useRef } from 'react'
import { shallow } from 'zustand/shallow'
import useControlStore from '@/stores/control'
import WifiItem from './smallItem/WifiItem'
import BluetoothItem from './smallItem/BluetoothItem'
import FullScreenItem from './smallItem/FullScreenItem'
import ThemeMode from './mode/ThemeMode'
import EyeMode from './mode/EyeMode'
import BrightnessSlider from './slider/BrightnessSlider'
import SoundSlider from './slider/SoundSlider'

interface Props {
	setMenuAway: (val: boolean) => void
}

/**
 * 控制中心窗口
 */
const ControlCenter = ({ setMenuAway }: Props) => {
	const [isDark, setIsDark, brightness, setBrightness, sound, setSound, eyeMode, setEyeMode] = useThemeStore(
		state => [
			state.isDark,
			state.setIsDark,
			state.brightness,
			state.setBrightness,
			state.sound,
			state.setSound,
			state.eyeMode,
			state.setEyeMode,
		],
		shallow,
	)
	const [wifi, setWifi, bluetooth, setBluetooth, fullscreen, setFullScreen] = useControlStore(
		state => [state.wifi, state.setWifi, state.bluetooth, state.setBluetooth, state.fullscreen, state.setFullScreen],
		shallow,
	)
	const ref = useRef<HTMLDivElement>(null)
	useClickAway(() => setMenuAway(false), ref)

	const styles = {
		bgColor: isDark ? 'bg-[#1a2133]/90' : 'bg-white/40',
		bgItemColor: isDark ? 'bg-[#2d3440]/90 border-gray-500' : 'bg-white/50',
	}

	return (
		<div
			ref={ref}
			className={`absolute p-3 select-none rounded-[13px] w-80 h-72 top-7 -left-72 flex flex-col shadow ${styles.bgColor}`}
		>
			<div className="flex w-full">
				{/* SmallItem */}
				<div className={`flex flex-col mr-3 rounded-[13px] border shadow w-32 h-36 ${styles.bgItemColor}`}>
					<WifiItem val={wifi} setVal={setWifi} />
					<BluetoothItem val={bluetooth} setVal={setBluetooth} />
					<FullScreenItem val={fullscreen} setVal={setFullScreen} />
				</div>
				{/* Mode */}
				<div className="flex flex-col w-48 justify-around">
					<ThemeMode isDark={isDark} val={isDark} setVal={setIsDark} />
					<EyeMode isDark={isDark} val={eyeMode} setVal={setEyeMode} brightness={brightness} setBrightness={setBrightness} />
				</div>
			</div>
			{/* Slider */}
			<BrightnessSlider val={brightness} setVal={setBrightness} />
			<SoundSlider val={sound} setVal={setSound} />
		</div>
	)
}

export default ControlCenter
