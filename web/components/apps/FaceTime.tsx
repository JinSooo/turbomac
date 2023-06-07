import { base64ToBlob } from '@/utils'
import { useRef } from 'react'
import Webcam from 'react-webcam'
import { saveAs } from 'file-saver'
import useAppsStore from '@/stores/apps'

const FaceTime = () => {
  const [maximizeApp] = useAppsStore(state => [state.maximizeApp])
  const isMaximize = maximizeApp === 'facetime'
	const webcamRef = useRef<Webcam>(null)

	const handleCapture = () => {
		if (!webcamRef.current) return

		const blob = base64ToBlob(webcamRef.current.getScreenshot() as string)
		saveAs(blob, 'handsomeBoy.jpg')
	}

	return (
		<div className="flex-col h-full space-y-6 bg-gray-800 flex-center">
			<Webcam
				ref={webcamRef}
				audio={false}
				screenshotFormat="image/jpeg"
				videoConstraints={{ facingMode: 'user' }}
				className={isMaximize ? 'h-[50rem]' : 'h-72'}
			/>
			<button className="btn btn-primary" onClick={handleCapture}>
				Capture!!!
			</button>
		</div>
	)
}

export default FaceTime
