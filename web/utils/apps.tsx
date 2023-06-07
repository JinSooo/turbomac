import LinkWeb from '@/components/apps/LinkWeb'
import { AppsData } from '@/types'

const appsData: AppsData[] = [
	{
		id: 'launchpad',
		title: 'Launchpad',
		img: '/img/icons/launchpad.png',
	},
	{
		id: 'vscode',
		title: 'VSCode',
		img: '/img/icons/vscode.png',
		width: 860,
		height: 560,
		content: <LinkWeb src="https://github1s.com/ljq0226/turbomac" title="VSCode" />,
	},
	{
		id: 'chatgpt',
		title: 'ChatGPT',
		img: '/img/icons/chatgpt.png',
	},
	{
		id: 'terminal',
		title: 'Terminal',
		img: '/img/icons/terminal.png',
	},
	{
		id: 'turbochat',
		title: 'TurboChat',
		img: '/img/icons/turbochat.png',
	},
	{
		id: 'login',
		title: 'Login',
		img: '/img/icons/qq.png',
	},
	{
		id: 'facetime',
		title: 'FaceTime',
		img: 'img/icons/facetime.png',
	},
	{
		id: 'email',
		title: 'Mail',
		img: '/img/icons/mail.png',
	},
	{
		id: 'github',
		title: 'Github',
		img: '/img/icons/github.png',
		width: 860,
		height: 560,
		content: <LinkWeb src="https://jinso.top" title="Serendipity" />,
	},
]

export default appsData
