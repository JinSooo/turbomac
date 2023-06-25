import { useRef } from 'react'
import Header from './Header'
import Input from './message/Input'

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
			<Input isDark={isDark} />
		</div>
	)
}

export default Window
