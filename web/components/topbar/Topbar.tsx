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

/**
 * 顶部栏
 */
const TopBar = () => {
	const [isDark, setIsDark, brightness, setBrightness, sound, setSound] = useThemeStore(
		state => [state.isDark, state.setIsDark, state.brightness, state.setBrightness, state.sound, state.setSound],
		shallow,
	)

	const [isWife, setIsWifi, showAppleIconMenu, setShowAppleIconMenu, showControlCenter, setShowControlCenter] = useControlStore(
		state => [
			state.isWife,
			state.setIsWifi,
			state.showAppleIconMenu,
			state.setShowAppleIconMenu,
			state.showControlCenter,
			state.setShowControlCenter,
		],
		shallow,
	)

	return (
		<div
			className={`w-full h-8 px-2 top-0 z-50 text-sm backdrop-blur-lg shadow transition select-none flex justify-between font-medium ${getFontColorByTheme(
				isDark,
			)}`}
		>
			{/* Apple Icon */}
			<div
				className="flex justify-center items-center w-[30px] rounded relative hover:bg-gray-400"
				onClick={() => setShowAppleIconMenu(true)}
			>
				<TopBarItem
					icon={
						<Image
							alt=""
							width={30}
							height={30}
							src={`${isDark ? '/img/icons/apple-white.png' : '/img/icons/apple-black.png'}`}
						/>
					}
				/>
				{showAppleIconMenu && <AppleIconMenu setMenuAway={() => setShowAppleIconMenu(false)} />}
			</div>
			{/* 中间填充空块 */}
			<div className="flex-1"></div>
			{/* right place */}
			<div className="flex items-center justify-end h-full space-x-2">
				{/* WIFI */}
				<TopBarItem
					icon={
						isWife ? <Wifi size={16} color={getColorByTheme(isDark)} /> : <WifiOff size={16} color={getColorByTheme(isDark)} />
					}
					toggle={() => setIsWifi(!isWife)}
				/>
				{/* Battery */}
				<Battery />
				{/* Control Center */}
				<div className="relative">
					<TopBarItem
						icon={<ArrowLeftRight size={16} color={getColorByTheme(isDark)} />}
						toggle={() => setShowControlCenter(!showControlCenter)}
					/>
					{showControlCenter && <ControlCenter setMenuAway={() => setShowControlCenter(!showControlCenter)} />}
				</div>
			</div>
		</div>
	)
}

export default TopBar
