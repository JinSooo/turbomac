import { useRef } from 'react'
import Header from './Header'
import Input from './input/Input'
import Communication from './message/Communication'

interface Props {
	isDark: boolean
}

const Window = ({ isDark }: Props) => {
	const windowRef = useRef<HTMLDivElement>(null)
	const styles = {
		bg: isDark ? 'bg-[#1a1a1a]' : 'bg-[#f2f2f2]',
	}

	return (
		<div ref={windowRef} className={`flex flex-col flex-1 select-none ${styles.bg}`}>
			<Header isDark={isDark} />
			<div className={`flex flex-col flex-1 overflow-hidden pl-3 pr-2 ${styles.bg}`}>
				<Communication isDark={isDark} />
				<Input isDark={isDark} />
			</div>
		</div>
	)
}

export default Window
