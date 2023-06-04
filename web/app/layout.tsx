import '@/styles/index.css'
import { Metadata } from 'next'
import GlobalWallpaper from './GlobalWallpaper'

export const metadata: Metadata = {
	title: 'TurboMac',
	description: 'TurboMac',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<link rel="icon" href="/apple.svg" />
			<body>
				<GlobalWallpaper>{children}</GlobalWallpaper>
			</body>
		</html>
	)
}
