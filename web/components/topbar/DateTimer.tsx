import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getFontColorByTheme } from '@/utils/theme'

interface Props {
	isDark: boolean
}

const DateTimer = ({ isDark }: Props) => {
	const [date, setDate] = useState<string>('00-00 00:00:00')

	useEffect(() => {
		let timer: NodeJS.Timeout
		const fn = () => {
			setDate(dayjs(new Date()).format('MM-DD HH:mm:ss'))
			timer = setTimeout(fn)
		}
		timer = setTimeout(fn)
		return () => {
			clearTimeout(timer)
		}
	})

	return <div className={getFontColorByTheme(isDark)}>{date}</div>
}

export default DateTimer
