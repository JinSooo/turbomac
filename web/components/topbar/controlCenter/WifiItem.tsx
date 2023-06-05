import useControlStore from '@/stores/control'
import { getColorByTheme } from '@/utils/theme'
import { Wifi } from 'lucide-react'

const WifiItem = () => {
	const [isWifi, setIsWifi] = useControlStore(state => [state.isWife, state.setIsWifi])
	const style = {
		bgColor: isWifi ? 'bg-primary' : 'bg-gray-300',
		wifiColor: getColorByTheme(isWifi),
		content: isWifi ? 'On' : 'Off',
	}

	return (
		<div className="flex p-2 space-x-2 h-1/3" onClick={() => setIsWifi(!isWifi)}>
			<div className={`w-[2rem] h-[2rem] rounded-full flex-center ${style.bgColor}`}>
				<Wifi size={16} color={style.wifiColor} />
			</div>
			<div className="space-y-1 leading-3">
				<p>Wi-Fi</p>
				<p>{style.content}</p>
			</div>
		</div>
	)
}

export default WifiItem
