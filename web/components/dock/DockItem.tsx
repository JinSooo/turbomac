import useDockHoverAnimation from '@/hooks/useDockHoverAnimation'
import useAlertStore, { AlertType } from '@/stores/alert'
import useAppsStore from '@/stores/apps'
import useUserStore from '@/stores/user'
import { AppsData } from '@/types'
import { MotionValue, motion } from 'framer-motion'
import { useRef } from 'react'

interface Props {
	app: AppsData
	mouseX: MotionValue
	dockSize: number
	dockMag: number
	isAppOpen: (id: string) => boolean
}

const DockItem = ({ app, mouseX, dockSize, dockMag, isAppOpen }: Props) => {
	const alert = useAlertStore(state => state.alert)
	const token = useUserStore(state => state.token)
	const [minimizeApps, openApp, removeMinimizeApp] = useAppsStore(state => [
		state.minimizeApps,
		state.openApp,
		state.removeMinimizeApp,
	])
	const imgRef = useRef<HTMLImageElement>(null)
	// 根据mouseX动态计算一个app的width
	const { width } = useDockHoverAnimation(mouseX, imgRef, dockSize, dockMag)

	const handleClick = () => {
		// email
		if (app.id === 'email') {
			alert(AlertType.INFO, 'Email: kimjinso@qq.com')
			return
		} else if (app.id === 'turbochat') {
			token ? openApp('turbochat') : openApp('login')
			return
		}

		if (app.link) {
			// 如果存在link直接跳转结束
			window.open(app.link)
			return
		}

		const isMinimize = minimizeApps.includes(app.id)
		if (isMinimize) {
			removeMinimizeApp(app.id)
			return
		} else {
			if (app.content) openApp(app.id)
		}
	}

	return (
		<li
			id={`dock-${app.id}`}
			className="flex flex-col items-center justify-end mb-1 transition duration-150 ease-in origin-bottom"
			onClick={handleClick}
		>
			<p className="absolute px-3 py-1 text-sm text-black rounded-md bg-gray-300/80 tooltip">{app.title}</p>
			<motion.img
				ref={imgRef}
				className="w-12 rounded-md appLink"
				src={app.img}
				alt={app.title}
				draggable={false}
				style={{ width: width, willChange: 'width' }}
			></motion.img>
			{/* 当app缩小后，会在图标下面显示一个点 */}
			<div className={`w-1 h-1 m-0 rounded-full bg-white/40 ${isAppOpen(app.id) ? '' : 'invisible'}`}></div>
		</li>
	)
}

export default DockItem
