import { useRef, useState } from 'react'
import { CommandNotFound, Row } from './util'

const Terminal = () => {
	// 标识指令id
	const currentId = useRef(0)
	// 命令块 jsx
	const [content, setContent] = useState<JSX.Element[]>([<Row key={0} id={0} onKeyDown={e => executeCommand(e, 0)} />])
	// 指令历史记录
	const [commandHistory, setCommandHistory] = useState<string[]>([])

	const addContent = (c: JSX.Element) => {
		setContent(content => [...content, c])
	}

	const addCommandHistory = (h: string) => {
		setCommandHistory(commandHistory => [...commandHistory, h])
	}

	// 执行指令
	const executeCommand = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
		const input = document.querySelector(`#terminal-input-${id}`) as HTMLInputElement
		const [command, arg] = input.value.trim().split(' ')

		if (e.key === 'Enter') {
			// 当前input已经执行，需被禁用
			input.disabled = true

			addCommandHistory(input.value)

			addContent(<CommandNotFound command={command} />)

			currentId.current++
			addContent(<Row key={currentId.current} id={currentId.current} onKeyDown={e => executeCommand(e, currentId.current)} />)
		}
	}

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
