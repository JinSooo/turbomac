import contextMenuConfig from '@/config/contextMenuConfig'
import { Fragment, useRef } from 'react'
import { useClickAway } from 'ahooks'
import useAlertStore, { AlertType } from '@/stores/alert'
import { shallow } from 'zustand/shallow'

interface Props {
	setMenuAway: () => void
	pagePosition: {
		pageX: number
		pageY: number
	}
}

const ContextMenu = ({ pagePosition, setMenuAway }: Props) => {
	const [alert] = useAlertStore(state => [state.alert], shallow)

	const contextMenuRef = useRef<HTMLDivElement>(null)
	// 点击元素外，关闭contextmenu
	useClickAway(() => setMenuAway(), contextMenuRef)

	const handleMenuItem = (content: string) => {
		alert(AlertType.SUCCESS, content)
	}

	return (
		<div
			className="absolute text-black rounded-md context-menu font-md h-70 w-52 bg-white/70"
			style={{ left: `${pagePosition.pageX}px`, top: `${pagePosition.pageY}px` }}
			onClick={() => setMenuAway()}
			ref={contextMenuRef}
		>
			<ul className="p-1">
				{contextMenuConfig.map((submenu, index) => {
					return (
						<Fragment key={index}>
							{submenu.map(item => (
								<li className="appleMenuItem" key={item.name} onClick={() => handleMenuItem(item.name)}>
									{item.name}
								</li>
							))}
							<div className="menuDivider"></div>
						</Fragment>
					)
				})}
			</ul>
		</div>
	)
}

export default ContextMenu
