import { LucideIcon } from "lucide-react"

interface Props {
  enter: boolean
  color: string
  Icon: LucideIcon
  onClick: () => void
}

const TrafficLight = ({enter, color, Icon, onClick}: Props) => {
	return (
		<div className={`w-[13px] h-[13px] mt-2 rounded-full ml-l flex-center ${color}`} onClick={onClick}>
			{enter && <Icon size={10} color="black" strokeWidth={3} />}
		</div>
	)
}

export default TrafficLight
