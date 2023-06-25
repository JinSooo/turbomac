import Image from 'next/image'

interface Props {
	isDark: boolean
}

const Search = ({ isDark }: Props) => {
	const styles = {
		bg: isDark ? 'bg-[#1e1e1e]' : 'bg-[#f5f5f5]',
	}

	return (
		<div className="flex w-full p-2 px-4 rounded-lg h-[44px]">
			<div className={`flex w-full ${styles.bg}`}>
				<div className="w-[24px] flex-center">
					<Image src="/chat/chatlist/search.svg" width={15} height={15} alt="chatavatar" />
				</div>
				<div className="flex-1 flex-center">
					<input className={`focus:outline-none w-full ${styles.bg}`} type="text" placeholder="Search" />
				</div>
				<div className="w-[24px] flex-center">
					<Image src="/chat/chatlist/add.svg" width={15} height={15} alt="chatavatar" />
				</div>
			</div>
		</div>
	)
}

export default Search
