import { Message } from '@/types'
import dayjs from 'dayjs'
import React from 'react'

interface Props {
	message: Message
	prevMessage: Message | null
}

const ONE_MINUTE = 60 * 1000

const TimeRender = ({ message, prevMessage }: Props) => {
	const render = () => {
		const curDate = dayjs(new Date(message.createAt ?? ''))
		if (!prevMessage) return curDate.format('YYYY/MM/DD HH:mm').toLocaleString()

		const nowDate = dayjs(new Date())
		const curHour = curDate.hour()
		const curMinute = curDate.minute()
		const isSameDay = curDate.date() === nowDate.date()
		const isYesterday = curDate.date() + 1 === nowDate.date()
		const isAM = curHour < 12
		const isPM = curHour >= 12 && curHour < 18
		const prevTime = prevMessage ? new Date(prevMessage.createAt ?? '').getTime() : 0

		// 超过5min显示一次时间
		if (curDate.unix() - prevTime > 5 * ONE_MINUTE) {
			if (isSameDay) return `${isAM ? '上午' : isPM ? '下午' : '晚上'} ${curHour}:${curMinute.toString().padStart(2, '0')}`
			else if (isYesterday) return `昨天 ${curHour}:${curMinute.toString().padStart(2, '0')}`
			else return curDate.format('YYYY/MM/DD HH:mm').toLocaleString()
		}
		return ''
	}

	return <p className="text-xs text-center text-gray-400">{render()}</p>
}

export default TimeRender
