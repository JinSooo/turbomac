import SmallItem from './SmallItem'
import { Wifi } from 'lucide-react'

interface Props {
	val: boolean
	setVal: (val: boolean) => void
}

const WifiItem = ({ val, setVal }: Props) => <SmallItem title="Wi-Fi" val={val} setVal={setVal} Icon={Wifi} />

export default WifiItem
