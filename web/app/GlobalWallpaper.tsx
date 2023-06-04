'use client'

import Alert from '@/components/ui/Alert/Alert'
import useAlertStore, { AlertType } from '@/stores/alert'
import useThemeStore from '@/stores/theme'
import wallpapers from '@/utils/wallpaper'
import { useState } from 'react'
import { shallow } from 'zustand/shallow'

const GlobalWallpaper = ({ children }: { children: React.ReactNode }) => {
	const [alert] = useAlertStore(state => [state.alert], shallow)
	const [brightness] = useThemeStore(state => [state.brightness], shallow)

	useState(() => {
		// 禁用window区域右键默认菜单弹窗
		window.oncontextmenu = e => {
			e.preventDefault()
		}

		alert(AlertType.INFO, 'Welcome to Turbomac !!!')
	})

	return (
		<div
			className="relative flex flex-col w-full h-full overflow-hidden bg-center bg-cover"
			style={{
				backgroundImage: `url(${wallpapers.light})`, // 壁纸
				filter: `brightness(${brightness * 0.7 + 50}%)`, // 亮度
			}}
		>
			<Alert />
			{children}
		</div>
	)
}

export default GlobalWallpaper
