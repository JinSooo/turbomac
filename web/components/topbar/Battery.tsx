import useThemeStore from '@/stores/theme'
import { useEffect, useState } from 'react'

/**
 * 声明getBattery()函数，ts里面并没有声明
 *  注：Firefox和Safari不支持
 */
declare global {
	interface Navigator {
		getBattery(): Promise<BatteryInfo>
	}
}
interface BatteryInfo {
	level: number
	charging: boolean
	setBattery: () => void
}

const Battery = () => {
	const [isDark] = useThemeStore(state => [state.isDark])
	const [battery, setBattery] = useState({
		level: 0,
		charging: false,
	})

	useEffect(() => {
		navigator.getBattery().then(battery => {
			setBattery({
				level: battery.level,
				charging: battery.charging,
			})
		})
	}, [])

	const styles = {
		batteryColor: battery.charging ? 'bg-[#32d74b]/60' : isDark ? 'bg-white' : 'bg-black/40',
	}

	return (
		<div className="flex items-center px-1 rounded hover:bg-gray-400">
			{/* 电池 */}
			<div className="flex items-center w-[20px] h-3 border border-[#99979d] p-[1.5px]">
				<div className={`h-full rounded-sm ${styles.batteryColor}`} style={{ width: `${Math.floor(16 * battery.level)}px` }} />
			</div>
			{/* 电池头部 */}
			<div className="w-0 h-0 m-0 border-[3px] border-l-solid  border-l-[#99979d] border-y-transparent border-r-transparent"></div>
			{/* 电池百分比 */}
			<div className="text-xs scale-90">{`${battery.level * 100}%`}</div>
		</div>
	)
}

export default Battery
