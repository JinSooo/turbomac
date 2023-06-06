'use client'

import useThemeStore from '@/stores/theme'
import { shallow } from 'zustand/shallow'
import Image from 'next/image'
import TopBarItem from './TopbarItem'
import useControlStore from '@/stores/control'
import AppleIconMenu from '../menu/AppleIconMenu'
import { ArrowLeftRight, Wifi, WifiOff } from 'lucide-react'
import Battery from './Battery'
import { getColorByTheme, getFontColorByTheme } from '@/utils/theme'
import ControlCenter from './controlCenter/ControlCenter'
import { Suspense, useMemo } from 'react'
import DateTimer from './DateTimer'

/**
 * 顶部栏
 */
const TopBar = () => {
	const [isDark, setIsDark, brightness, setBrightness, sound, setSound] = useThemeStore(
		state => [state.isDark, state.setIsDark, state.brightness, state.setBrightness, state.sound, state.setSound],
		shallow,
	)

	const [wifi, setWifi, showAppleIconMenu, setShowAppleIconMenu, showControlCenter, setShowControlCenter] = useControlStore(
		state => [
			state.wifi,
			state.setWifi,
			state.showAppleIconMenu,
			state.setShowAppleIconMenu,
			state.showControlCenter,
			state.setShowControlCenter,
		],
		shallow,
	)

	// 样式抽离复用
	const styles = useMemo(
		() => ({
			appleIcon: isDark ? '/img/icons/apple-white.png' : '/img/icons/apple-black.png',
			iconColor: getColorByTheme(isDark),
			font: getFontColorByTheme(isDark),
		}),
		[isDark],
	)

	return (
		<div
			className={`w-full h-8 px-2 top-0 z-50 text-sm backdrop-blur-xl shadow transition select-none flex justify-between font-medium ${styles.font}`}
		>
			{/* Apple Icon */}
			<div
				className="flex justify-center items-center w-[30px] rounded relative hover:bg-gray-400"
				onClick={() => setShowAppleIconMenu(true)}
			>
				<TopBarItem icon={<Image alt="" width={30} height={30} src={styles.appleIcon} />} />
				{showAppleIconMenu && <AppleIconMenu setMenuAway={setShowAppleIconMenu} />}
			</div>
			{/* 中间填充空块 */}
			<div className="flex-1"></div>
			{/* right place */}
			<div className="flex items-center justify-end h-full space-x-2">
				{/* WIFI */}
				<TopBarItem
					icon={wifi ? <Wifi size={16} color={styles.iconColor} /> : <WifiOff size={16} color={styles.iconColor} />}
					toggle={setWifi}
					val={wifi}
				/>
				{/* Battery */}
				<Battery />
				{/* Control Center */}
				<div className="relative">
					<TopBarItem
						icon={<ArrowLeftRight size={16} color={styles.iconColor} />}
						toggle={setShowControlCenter}
						val={showControlCenter}
					/>
					{showControlCenter && <ControlCenter setMenuAway={setShowControlCenter} />}
				</div>
				<DateTimer isDark={isDark} />
			</div>
		</div>
	)
}

export default TopBar
