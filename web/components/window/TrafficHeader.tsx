import { Maximize2, Minimize2, Minus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import TrafficLight from './TrafficLight'

interface Props {
	maximizeApp: string
	handleMaximize: () => void
	handleMinimize: () => void
	addMinimizeApp: () => void
	closeApp: () => void
}

/**
 * Mac Window 头部
 */
const TrafficHeader = ({ maximizeApp, handleMaximize, handleMinimize, addMinimizeApp, closeApp }: Props) => {
	const trafficLightRef = useRef<HTMLDivElement>(null)
	// 是否移入header
	const [enter, setEnter] = useState(false)

	useEffect(() => {
		const trafficLight = trafficLightRef.current!
		const handleEnter = () => setEnter(true)
		const handleLeave = () => setEnter(false)

		trafficLight.addEventListener('mouseenter', handleEnter)
		trafficLight.addEventListener('mouseleave', handleLeave)
		return () => {
			trafficLight.removeEventListener('mouseenter', handleEnter)
			trafficLight.removeEventListener('mouseleave', handleLeave)
		}
	}, [])

	return (
		<div className="bg-transparent absolute">
			<div ref={trafficLightRef} className="traffic-lights relative flex space-x-2 w-[60px] ml-1">
				<TrafficLight enter={enter} color="bg-red-500" onClick={closeApp} Icon={X} />
				<TrafficLight enter={enter} color="bg-yellow-500" onClick={addMinimizeApp} Icon={Minus} />
				<TrafficLight
					enter={enter}
					color="bg-green-500"
					onClick={maximizeApp ? handleMinimize : handleMaximize}
					Icon={maximizeApp ? Minimize2 : Maximize2}
				/>
			</div>
		</div>
	)
}

export default TrafficHeader
