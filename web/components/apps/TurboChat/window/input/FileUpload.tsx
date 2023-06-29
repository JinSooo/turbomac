import useChatStore from '@/stores/chat'
import useSocketStore from '@/stores/socket'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { UserInfo } from '@/types'
import useAlertStore, { AlertType } from '@/stores/alert'

interface Props {
	isDark: boolean
	name?: string
	desc?: string
	userInfo: UserInfo
}
const FileUpload = ({ isDark, name = 'file', desc = '文件', userInfo }: Props) => {
	const socket = useSocketStore(state => state.socket)
	const [sentFlag, setSentFlag] = useChatStore(state => [state.sentFlag, state.setSentFlag])
	const alert = useAlertStore(state => state.alert)
	const fileRef = useRef<HTMLInputElement>(null)
	const [isHover, setIsHover] = useState(false)
	const styles = {
		bg: isDark ? 'bg-[#262626] ' : 'bg-[#fff] text-black',
		src: isDark ? name : `${name}_dark`,
		img: isHover
			? `/chat/chatwindow/${name}_fill.svg`
			: isDark
			? `/chat/chatwindow/${name}.svg`
			: `/chat/chatwindow/${name}_dark.svg`,
	}

	const handleFileClick = () => {
		fileRef.current?.click()
	}
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files
		if (fileList) {
			const file = fileList[0]
			if (file.size > 4000000) {
				alert(AlertType.WARNING, '您没有权限上传大于 4MB 的文件')
				return
			}
			alert(AlertType.SUCCESS, '上传成功')
		}
	}

	return (
		<div
			className="rounded-lg h-[46px] flex-center relative px-[5px] tooltip tooltip-bottom"
			data-tip={desc}
			onClick={handleFileClick}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Image src={styles.img} width={20} height={20} alt="chatappicon" />
			<input type="file" ref={fileRef} className="hidden" onChange={handleFileChange} />
		</div>
	)
}

export default FileUpload
