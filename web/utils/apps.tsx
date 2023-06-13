import FaceTime from '@/components/apps/FaceTime'
import LinkWeb from '@/components/apps/LinkWeb'
import Terminal from '@/components/apps/Terminal/Terminal'
import Login from '@/components/apps/TurboChat/Login'
import { AppsData } from '@/types'

const appsData: AppsData[] = [
	{
		id: 'launchpad',
		title: 'Launchpad',
		img: '/img/icons/launchpad.png',
		width: 860,
		height: 560,
		content: <LinkWeb src="https://jinso.top" title="Serendipity" />,
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
		width: 600,
		height: 540,
		content: <Terminal />,
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
		width: 320,
		height: 448,
		content: <Login />,
	},
	{
		id: 'facetime',
		title: 'FaceTime',
		img: 'img/icons/facetime.png',
		content: <FaceTime />,
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
		link: 'https://github.com/JinSooo/turbomac',
	},
]

export default appsData
