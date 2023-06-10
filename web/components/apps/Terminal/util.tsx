interface Props {
	id: number
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Row = ({ id, onKeyDown }: Props) => {
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
						type="text"
						id={`terminal-input-${id}`}
						autoComplete="off"
						autoFocus={true}
						className="w-full bg-transparent outline-none"
						onKeyDown={onKeyDown}
					/>
				</code>
			</pre>
		</>
	)
}

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
