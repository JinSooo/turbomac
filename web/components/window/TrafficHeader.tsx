import { Maximize2, Minimize2, Minus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Props {
	maximizeApp: string
	handleMaximize: () => void
	handleMinimize: () => void
	addMinimizeApp: () => void
	closeApp: () => void
}

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
        {/* Close */}
				<div className="bg-red-500 w-[13px] h-[13px] mt-2 rounded-full ml-l flex-center" onClick={closeApp}>
					{enter && <X size={10} color="black" strokeWidth={3} />}
				</div>
        {/* Minimize */}
				<div className="bg-yellow-500 w-[13px] h-[13px] mt-2 rounded-full ml-l flex-center" onClick={addMinimizeApp}>
					{enter && <Minus size={10} color="black" strokeWidth={3} />}
				</div>
        {/* maximize */}
				<div className="bg-green-500 w-[13px] h-[13px] mt-2 rounded-full ml-l flex-center" onClick={maximizeApp ? handleMinimize : handleMaximize}>
					{enter && (maximizeApp ? (
						<Minimize2 size={10} color="black" strokeWidth={2} />
					) : (
						<Maximize2 size={10} color="black" strokeWidth={2} />
					))}
				</div>
			</div>
		</div>
	)
}

export default TrafficHeader
