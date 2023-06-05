'use client'

import ContextMenu from '@/components/menu/ContextMenu'
import Alert from '@/components/ui/Alert/Alert'
import useAlertStore, { AlertType } from '@/stores/alert'
import useThemeStore from '@/stores/theme'
import wallpapers from '@/utils/wallpaper'
import { useEffect, useRef, useState } from 'react'
import { shallow } from 'zustand/shallow'

const GlobalWallpaper = ({ children }: { children: React.ReactNode }) => {
	const [alert] = useAlertStore(state => [state.alert], shallow)
	const [brightness, isDark] = useThemeStore(state => [state.brightness, state.isDark], shallow)

	// 用于contextMenu
	const wallpaperRef = useRef<HTMLDivElement>(null)
	const [isMenuAway, setIsMenuAway] = useState(false)
	const [pagePosition, setPagePosition] = useState({
		pageX: 0,
		pageY: 0,
	})

	// 右击事件
	const handleContextMenu = (e: MouseEvent) => {
		setIsMenuAway(true)
		setPagePosition({ pageX: e.pageX, pageY: e.pageY })
	}

	useEffect(() => {
		alert(AlertType.INFO, 'Welcome to Turbomac !!!')

		// 禁用window区域右键默认菜单弹窗
		window.oncontextmenu = e => {
			e.preventDefault()
		}

		// 添加自定义contextMenu
		const desktop = wallpaperRef.current!
		desktop.addEventListener('contextmenu', handleContextMenu)
		return () => {
			desktop.removeEventListener('contextmenu', handleContextMenu)
		}
	}, [])

	return (
		<div
			className="relative flex flex-col w-full h-full overflow-hidden bg-center bg-cover"
			style={{
				backgroundImage: `url(${isDark ? wallpapers.dark : wallpapers.light})`, // 壁纸
				filter: `brightness(${brightness * 0.7 + 50}%)`, // 亮度
			}}
			ref={wallpaperRef}
		>
			<Alert />
			{children}
			{isMenuAway && <ContextMenu setMenuAway={() => setIsMenuAway(false)} pagePosition={pagePosition} />}
		</div>
	)
}

export default GlobalWallpaper
