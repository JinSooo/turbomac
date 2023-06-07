'use client'

import useAppsStore from '@/stores/apps'
import appsData from '@/utils/apps'
import { useMotionValue } from 'framer-motion'
import { useState } from 'react'
import DockItem from './DockItem'

const Dock = () => {
	const [maximizeApp, displayApps] = useAppsStore(state => [state.maximizeApp, state.displayApps])
	const [dock, setDock] = useState({
		size: 50,
		mag: 2,
	})
	// 监听鼠标在Dock上的移动
	const mouseX = useMotionValue<number | null>(null)

	// 判断app是否打开过
	const isAppOpen = (id: string) => {
		return displayApps.includes(id)
	}

	return (
		<div
			className={`dock select-none w-full fixed left-0 right-0 mx-auto bottom-4 overflow-x-visible ${
				maximizeApp ? 'z-0' : 'z-50'
			}`}
		>
			<ul
				className="flex px-2 mx-auto space-x-2 dock max-w-max backdrop-blur-xl border-1 rounded-xl bg-white/20 glass"
				style={{ height: `${dock.size + 15}px` }}
				onMouseMove={e => mouseX.set(e.nativeEvent.x)}
				onMouseLeave={() => mouseX.set(null)}
			>
				{appsData.map(app => (
					<DockItem key={app.id} app={app} mouseX={mouseX} dockSize={dock.size} dockMag={dock.mag} isAppOpen={isAppOpen} />
				))}
			</ul>
		</div>
	)
}

export default Dock
