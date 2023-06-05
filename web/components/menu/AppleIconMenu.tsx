import appleIconMenuConfig from '@/config/appleIconMenuConfig'
import { useRef } from 'react'
import { useClickAway } from 'ahooks'
import useAlertStore, { AlertType } from '@/stores/alert'
import { shallow } from 'zustand/shallow'
import Menu from './Menu'

interface Props {
	setMenuAway: (val: boolean) => void
}

/**
 * 苹果图标菜单
 */
const AppleIconMenu = ({ setMenuAway }: Props) => {
	const [alert] = useAlertStore(state => [state.alert], shallow)

	const contextMenuRef = useRef<HTMLDivElement>(null)
	// 点击元素外，关闭contextmenu
	useClickAway(() => setMenuAway(false), contextMenuRef)

	const handleMenuItem = (content: string) => {
		alert(AlertType.SUCCESS, content)
	}

	return (
		<div
			className="absolute text-black rounded-md font-md h-70 w-52 bg-gray-400/90 top-9 left-1"
			onClick={() => setMenuAway(false)}
			ref={contextMenuRef}
		>
			<Menu menuConfig={appleIconMenuConfig} handleMenuItem={handleMenuItem} />
		</div>
	)
}

export default AppleIconMenu
