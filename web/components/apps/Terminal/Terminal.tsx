import { useEffect, useRef, useState } from 'react'
import { AppNotFound, CommandNotFound, Row } from './util'
import useAppsStore from '@/stores/apps'
import appsData from '@/utils/apps'

interface CommandList {
	[key: string]: { (): void } | { (arg: string): void }
}

const Terminal = () => {
	const [openApp, closeApp] = useAppsStore(state => [state.openApp, state.closeApp])

	// 标识指令id
	const currentId = useRef(0)
	// 当前命令行input的实例（子组件的映射）
	const inputRef = useRef<HTMLInputElement>(null)
	// 命令块 jsx
	const [content, setContent] = useState<JSX.Element[]>([])
	// 指令历史记录
	const [commandHistory, setCommandHistory] = useState<string[]>([])
	// 用于上下调节命令历史记录的偏移量
	const [commandOffset, setCommandOffset] = useState<number>(0)

	const addContent = (c: JSX.Element) => {
		setContent(content => [...content, c])
	}
	const addCommandHistory = (h: string) => {
		setCommandHistory(commandHistory => [...commandHistory, h])
	}
	const arrowUp = () => {
		// TODO: 这边边界暂时做不了，commandHistory获取不到（不想用那种强获取的方式）
		setCommandOffset(offset => offset - 1)
	}
	const arrowDown = () => {
		setCommandOffset(offset => Math.min(offset + 1, 0))
	}
	const resetCommandOffset = () => {
		setCommandOffset(0)
	}

	// 指令
	// 打开app
	const open = (arg: string = '') => {
		// 确保app存在
		if (!appsData.find(app => app.id === arg)) {
			addContent(<AppNotFound command={arg} />)
			return
		}

		openApp(arg)
		addContent(
			<pre>
				<code>Open {arg} ...</code>
			</pre>,
		)
	}
	// 打开app
	const close = (arg: string = '') => {
		// 确保app存在
		if (!appsData.find(app => app.id === arg)) {
			addContent(<AppNotFound command={arg} />)
			return
		}

		closeApp(arg)
		addContent(
			<pre>
				<code>Close {arg} ...</code>
			</pre>,
		)
	}

	// 指令集
	const commandList: CommandList = { open, close }

	// 执行指令
	const executeCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const [command, arg] = inputRef.current!.value.trim().split(' ')

		if (e.key === 'ArrowUp') {
			arrowUp()
		} else if (e.key === 'ArrowDown') {
			arrowDown()
		} else if (e.key === 'Enter') {
			// 当前input已经执行，需被禁用
			inputRef.current!.disabled = true

			// 命令不为空加入（防止不断按空格）
			if (command) {
				addCommandHistory(inputRef.current!.value)
			}

			if (command && Object.keys(commandList).includes(command)) {
				commandList[command](arg)
			} else {
				addContent(<CommandNotFound command={command} />)
			}

			currentId.current++
			// 通过ref={inputRef}，不断更新inputRef的最新input
			addContent(<Row key={currentId.current} id={currentId.current} ref={inputRef} executeCommand={executeCommand} />)
			resetCommandOffset()
		}
	}

	// TODO: 命令历史的获取暂时先这样，后面再改；现在这种边界处理太恶心了
	// arrowup指令的input更新
	useEffect(() => {
		if (!inputRef.current) return
		if (commandOffset < -commandHistory.length) return

		if (commandOffset === 0) {
			inputRef.current!.value = ''
		} else if (commandHistory.length > 0) {
			inputRef.current!.value = commandHistory[commandHistory.length + commandOffset]
		}
	}, [commandOffset])

	// 初始化
	useEffect(() => {
		addContent(<Row key={0} id={0} ref={inputRef} executeCommand={executeCommand} />)
	}, [])

	return (
		<div className="mockup-code h-full" style={{ fontFamily: 'Melon, monospace', fontSize: '14px' }}>
			<div className="mockup-code">
				<pre>
					<code>Welcome to TueboMac,type `help` to get started,have fun!</code>
				</pre>
				{/* <Row id={1} /> */}
				{...content}
			</div>
		</div>
	)
}

export default Terminal
