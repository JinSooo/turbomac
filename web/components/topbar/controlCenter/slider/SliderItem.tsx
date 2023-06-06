import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

interface Props {
	val: number
	setVal: (val: number) => void
	Icon: JSX.Element
}

const SliderItem = ({ val, setVal, Icon }: Props) => {
	return (
		<div className="flex flex-col p-2 my-2 rounded-[13px] bg-white/50">
			<div className="flex w-full slider">
				<div className="flex-center bg-gray-100 border-gray-300 rounded-l-full w-7 h-7">{Icon}</div>
				<Slider value={val} tooltip={false} onChange={val => setVal(val)} />
			</div>
		</div>
	)
}

export default SliderItem
