import { MenuItem } from '@/types'

/**
 * 苹果图标菜单
 */
const appleIconMenuConfig: MenuItem[][] = [
	[
		{
			name: 'About This Mac',
		},
	],
	[
		{
			name: 'Systeam Prefrences...',
		},
		{
			name: 'Apple Store...',
		},
	],
	[
		{
			name: 'Recent Items',
		},
	],
	[
		{
			name: 'Force Quit...',
		},
	],
	[
		{
			name: 'Sleep',
		},
		{
			name: 'Restart...',
		},
		{
			name: 'Shut Down...',
		},
	],
	[
		{
			name: 'Lock Screen',
		},
		{
			name: 'Log Out...',
		},
	],
]

export default appleIconMenuConfig
