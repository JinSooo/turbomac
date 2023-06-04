import { MenuItem } from '@/types'
import { Fragment } from 'react'

interface Props {
	menuConfig: MenuItem[][]
	handleMenuItem?: (val: any) => void
}

/**
 * 菜单内容
 */
const Menu = ({ menuConfig, handleMenuItem }: Props) => (
	<ul className="p-1">
		{menuConfig.map((submenu, index) => {
			return (
				<Fragment key={index}>
					{submenu.map(item => (
						<li className="appleMenuItem" key={item.name} onClick={() => handleMenuItem?.(item.name)}>
							{item.name}
						</li>
					))}
					<div className="menuDivider"></div>
				</Fragment>
			)
		})}
	</ul>
)

export default Menu
