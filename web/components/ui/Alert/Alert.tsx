'use client'

import useAlertStore from '@/stores/alert'
import { shallow } from 'zustand/shallow'
import { getClass, getSVG } from './util'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect } from 'react'

const Alert = () => {
	const [isShow, type, content, duration, setShow] = useAlertStore(
		state => [state.isShow, state.type, state.content, state.duration, state.setShow],
		shallow,
	)

	const renderAlert = useCallback(
		() => (
			<div className={`shadow-lg alert ${getClass(type)}`}>
				<div>
					{getSVG(type)}
					<span>{content}</span>
				</div>
			</div>
		),
		[type, content],
	)

	// 定时关闭
	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(false)
		}, duration)
		return () => {
			clearTimeout(timer)
		}
	}, [])

	return (
		<AnimatePresence>
			{isShow && (
				<motion.div
					className="fixed w-[30%] top-[8%] left-[35%] z-[100]"
					initial={{ top: '-10%' }}
					animate={{ top: '5%' }}
					exit={{ opacity: 0 }}
					transition={{ type: 'spring' }}
				>
					{renderAlert()}
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Alert
