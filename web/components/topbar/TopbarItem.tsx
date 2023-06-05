interface Props {
	icon?: React.ReactNode
	val?: boolean
	toggle?: (val: boolean) => void
}

// TODO: toggle会造成不必要的渲染
const TopBarItem = ({ icon, val, toggle }: Props) => {
	return (
		<div className="px-1 rounded hover:bg-gray-400" onClick={() => toggle?.(!val)}>
			{icon}
		</div>
	)
}

export default TopBarItem