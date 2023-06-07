interface Props {
	src: string
	title: string
}

const LinkWeb = ({ src, title }: Props) => {
	return (
		<>
			<div className="w-full bg-[#272728] rounded-t-lg h-7"></div>
			<iframe className="w-full h-full" src={src} title={title}></iframe>
		</>
	)
}

export default LinkWeb
