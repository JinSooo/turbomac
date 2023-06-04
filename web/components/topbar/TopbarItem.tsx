interface Props {
  icon?: React.ReactNode
  toggle?: () => void
}

// TODO: toggle会造成不必要的渲染
const TopBarItem = ({icon, toggle}: Props) => {
  return <div className="px-1 rounded hover:bg-gray-400" onClick={() => toggle?.()}>{icon}</div>
}

export default TopBarItem