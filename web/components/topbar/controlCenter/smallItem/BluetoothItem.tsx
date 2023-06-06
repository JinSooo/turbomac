import SmallItem from './SmallItem'
import { Bluetooth } from 'lucide-react'

interface Props {
	val: boolean
	setVal: (val: boolean) => void
}

const WifiItem = ({ val, setVal }: Props) => <SmallItem title="Bluetooth" val={val} setVal={setVal} Icon={Bluetooth} />

export default WifiItem
