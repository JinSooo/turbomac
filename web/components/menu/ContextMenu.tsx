import contextMenuConfig from '@/config/contextMenuConfig'
import { useRef } from 'react'
import { useClickAway } from 'ahooks'

interface Props {
	setMenuAway: () => void
	pagePosition: {
		pageX: number
		pageY: number
	}
}

const ContextMenu = ({ pagePosition, setMenuAway }: Props) => {
	const contextMenuRef = useRef<HTMLDivElement>(null)
	// 点击元素外，关闭contextmenu
	useClickAway(() => setMenuAway(), contextMenuRef)

	return (
		<div
			className="absolute text-black rounded-md context-menu font-md h-70 w-52 bg-white/70"
			style={{ left: `${pagePosition.pageX}px`, top: `${pagePosition.pageY}px` }}
			onClick={() => setMenuAway()}
			ref={contextMenuRef}
		>
			<ul className="p-1">
				{contextMenuConfig.map(submenu => {
					return (
						<>
							{submenu.map(item => (
								<li className="appleMenuItem" key={item.name}>
									{item.name}
								</li>
							))}
							<div className="menuDivider"></div>
						</>
					)
				})}
			</ul>
		</div>
	)
}

export default ContextMenu
