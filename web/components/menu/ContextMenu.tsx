import contextMenuConfig from '@/config/contextMenuConfig'
import { useRef } from 'react'
import { useClickAway } from 'ahooks'
import useAlertStore, { AlertType } from '@/stores/alert'
import { shallow } from 'zustand/shallow'
import Menu from './Menu'

interface Props {
	setMenuAway: (val: boolean) => void
	pagePosition: {
		pageX: number
		pageY: number
	}
}

/**
 * 右击菜单
 */
const ContextMenu = ({ pagePosition, setMenuAway }: Props) => {
	const [alert] = useAlertStore(state => [state.alert], shallow)

	const contextMenuRef = useRef<HTMLDivElement>(null)
	// 点击元素外，关闭contextmenu
	useClickAway(() => setMenuAway(false), contextMenuRef)

	const handleMenuItem = (content: string) => {
		alert(AlertType.SUCCESS, content)
	}

	return (
		<div
			className="absolute text-black rounded-md font-md h-70 w-52 bg-white/70"
			style={{ left: `${pagePosition.pageX}px`, top: `${pagePosition.pageY}px` }}
			onClick={() => setMenuAway(false)}
			ref={contextMenuRef}
		>
			<Menu menuConfig={contextMenuConfig} handleMenuItem={handleMenuItem} />
		</div>
	)
}

export default ContextMenu
