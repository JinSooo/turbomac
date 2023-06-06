import SmallItem from './SmallItem'
import { Expand } from 'lucide-react'

interface Props {
	val: boolean
	setVal: (val: boolean) => void
}

const FullScreenItem = ({ val, setVal }: Props) => {
	const handleClick = () => {
		if (val) {
			document.exitFullscreen()
		} else {
			document.documentElement.requestFullscreen()
		}
	}

	return <SmallItem title="FullScreen" val={val} setVal={setVal} Icon={Expand} click={handleClick} />
}

export default FullScreenItem
