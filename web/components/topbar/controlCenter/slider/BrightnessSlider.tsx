import { Sun } from 'lucide-react'
import SliderItem from './SliderItem'

interface Props {
	val: number
	setVal: (val: number) => void
}

const BrightnessSlider = ({ val, setVal }: Props) => (
	<SliderItem val={val} setVal={setVal} Icon={<Sun size={16} color="#000" />} />
)

export default BrightnessSlider
