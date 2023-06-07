'use client'

import useAppsStore from '@/stores/apps'
import appsData from '@/utils/apps'
import Window from './Window'
import { AnimatePresence } from 'framer-motion'

/**
 * 所有应用窗口
 */
const WindowApp = () => {
	const [displayApps] = useAppsStore(state => [state.displayApps])

	// 渲染所有需要显示的app
	const renderWindowApp = () => {
		return displayApps.map(appId => {
			const appInfo = appsData.find(app => app.id === appId)!
			return (
				<Window key={appInfo.id} app={appInfo}>
					{appInfo.content}
				</Window>
			)
		})
	}

	return <AnimatePresence>{renderWindowApp()}</AnimatePresence>
}

export default WindowApp
