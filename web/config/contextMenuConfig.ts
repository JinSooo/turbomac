import { MenuItem } from '@/types'

/**
 * 右击菜单
 */
const contextMenuConfig: MenuItem[][] = [
	[
		{
			name: 'New Folder',
		},
	],
	[
		{
			name: 'Get Info',
		},
		{
			name: 'Change Desktop Background',
		},
	],
	[
		{
			name: 'Use Stacks',
		},
		{
			name: 'Sort By',
		},
		{
			name: 'Clean Up',
		},
		{
			name: 'Clean Up By',
		},
		{
			name: 'Show View Options',
		},
	],
]

export default contextMenuConfig
