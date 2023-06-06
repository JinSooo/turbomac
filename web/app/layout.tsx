import '@/styles/index.css'
import { Metadata } from 'next'
import GlobalWallpaper from './GlobalWallpaper'
import TopBar from '@/components/topbar/Topbar'
import Dock from '@/components/dock/Dock'

export const metadata: Metadata = {
	title: 'TurboMac',
	description: 'TurboMac',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<link rel="icon" href="/apple.svg" />
			<body>
				<GlobalWallpaper>
					<TopBar />
					{children}
					<Dock />
				</GlobalWallpaper>
			</body>
		</html>
	)
}
