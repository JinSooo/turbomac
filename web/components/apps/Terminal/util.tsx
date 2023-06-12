import { Ref, forwardRef } from 'react'

interface Props {
	id: number
	executeCommand: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const RowWithRef = ({ id, executeCommand }: Props, ref: Ref<HTMLInputElement>) => {
	return (
		<>
			<pre>
				<code>
					<span className="text-warning mr-2">serendipity</span>
					<span className="text-success mr-2">@macbook</span>
					<span className="text-info">~</span>
				</code>
			</pre>
			<pre data-prefix="$" className="flex">
				<code className="flex-1">
					<input
						ref={ref}
						type="text"
						autoComplete="off"
						autoFocus={true}
						className="w-full bg-transparent outline-none"
						onKeyDown={e => executeCommand(e)}
					/>
				</code>
			</pre>
		</>
	)
}

const Row = forwardRef(RowWithRef)

const CommandNotFound: React.FC<{ command: string }> = ({ command }) => {
	return (
		<pre>
			<code className="text-error">
				cmd: command not found: <span className="text-warning">{command}</span>
			</code>
		</pre>
	)
}

export { Row, CommandNotFound }
