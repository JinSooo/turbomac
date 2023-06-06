import { Headphones } from 'lucide-react'
import SliderItem from './SliderItem'

interface Props {
	val: number
	setVal: (val: number) => void
}

const SoundSlider = ({ val, setVal }: Props) => (
	<SliderItem val={val} setVal={setVal} Icon={<Headphones size={16} color="#000" />} />
)

export default SoundSlider
