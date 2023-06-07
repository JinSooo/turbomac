import useWindowSize from '@/hooks/useWindowSize'
import useAppsStore from '@/stores/apps'
import { AppsData } from '@/types'
import { useLocalStorageState } from 'ahooks'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useDraggable } from '@neodrag/react'
import type { DragOptions } from '@neodrag/react'
import TrafficHeader from './TrafficHeader'

/**
 * 窗口容器
 */
interface Props {
	app: AppsData
	children: React.ReactNode
}

// 用于focusApp时不同层级的大小
const defaultConfig = {
	zIndex: 15,
	width: 540,
	height: 450,
}

const Window = ({ app, children }: Props) => {
	const [maximizeApp, setMaximizeApp, focusApp, setFocusApp, minimizeApps, addMinimizeApp, closeApp] = useAppsStore(state => [
		state.maximizeApp,
		state.setMaximizeApp,
		state.focusApp,
		state.setFocusApp,
		state.minimizeApps,
		state.addMinimizeApp,
		state.closeApp,
	])
	// 配置app默认值
	app.width = app.width ?? defaultConfig.width
	app.height = app.height ?? defaultConfig.height
	// 获取窗口大小
	const { winWidth, winHeight } = useWindowSize()
	// window大小
	const [box, setBox] = useState({
		width: 0,
		height: 0,
	})
	// window位置
	const [position, setPosition] = useState({
		// 随机显示一个位置
		x: maximizeApp ? 0 : winWidth * (Math.random() * 0.2 + 0.05),
		y: maximizeApp ? 0 : winHeight * (Math.random() * 0.2 + 0.05),
	})
	// 记录上一次window位置，用于放大缩小后定位
	const [lastPosition, setLastPosition] = useLocalStorageState('LAST_POSITION', { defaultValue: position })

	// 初始化拖拽元素
	const draggableRef = useRef<HTMLDivElement>(null)
	const options: DragOptions = {
		position, //位置
		handle: '.window-header', // 配置该class的元素可拖拽draggableRef元素
		cancel: '.traffic-lights', // 配置该class的元素不可拖拽draggableRef元素
		bounds: { bottom: -500, top: 32, left: -600, right: -600 }, // 边界
		onDrag: ({ offsetX, offsetY }) => setPosition({ x: offsetX, y: offsetY }),
		disabled: !!maximizeApp, // 当放大后禁止拖拽
	}
	useDraggable(draggableRef, options)

	const isMinimize = minimizeApps.includes(app.id)
	const isFocus = focusApp === app.id

	const handleMaximize = () => {
		setMaximizeApp(app.id)
		setBox({ width: winWidth, height: winHeight })
		setLastPosition(position)
		setPosition({ x: 0, y: 0 })
	}
	const handleMinimize = () => {
		setMaximizeApp('')
		setBox({ width: Math.min(winWidth, app.width!), height: Math.min(winHeight, app.height!) })
		setPosition(lastPosition!)
	}

	useEffect(() => {
		setBox({
			width: maximizeApp ? winWidth : Math.min(winWidth, app.width!),
			height: maximizeApp ? winHeight : Math.min(winHeight, app.height!),
		})
		setFocusApp(app.id)
	}, [])

	return (
		<motion.div
			ref={draggableRef}
			className="absolute rounded-xl"
			style={{
				width: `${box.width}px`,
				height: `${box.height}px`,
				zIndex: maximizeApp ? 100 : isFocus ? defaultConfig.zIndex + 1 : defaultConfig.zIndex, // 层级压制
				visibility: isMinimize ? 'hidden' : 'visible', // 缩小隐藏
			}}
			onClick={() => setFocusApp(app.id)}
			transition={{ type: 'spring', stiffness: 100, damping: 20 }}
		>
			<motion.header
				className="absolute z-10 flex w-full bg-transparent h-7 window-header rounded-t-xl"
				onDoubleClick={maximizeApp ? handleMinimize : handleMaximize}
				initial={{ opacity: 0.3, scale: 1.1 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: 'spring', stiffness: 100, damping: 20 }}
			>
				<TrafficHeader
					maximizeApp={maximizeApp}
					handleMaximize={handleMaximize}
					handleMinimize={handleMinimize}
					addMinimizeApp={() => addMinimizeApp(app.id)}
					closeApp={() => closeApp(app.id)}
				/>
			</motion.header>
			<motion.div
				className="relative w-full h-full"
				initial={{ opacity: 0.3, scale: 1.1 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: 'spring', stiffness: 80, damping: 30 }}
			>
				{children}
			</motion.div>
		</motion.div>
	)
}

export default Window
