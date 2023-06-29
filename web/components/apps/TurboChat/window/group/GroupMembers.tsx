import Image from 'next/image'
import React, { useState } from 'react'
import { ActiveUser } from '@/types'

interface Props {
	isDark: boolean
	activeUsers: ActiveUser[]
}

const GroupMembers = ({ isDark, activeUsers }: Props) => {
	const [isHover, setIsHover] = useState(false)
	const styles = {
		bg: isDark ? 'bg-[#1a1a1a]' : 'bg-[#f2f2f2]',
		font: isDark ? '' : 'text-black',
		hover: isHover ? 'chatlist_' : 'chatlist',
	}

	return (
		<div className={`flex flex-col flex-1 w-full ${styles.bg} ${styles.font}`}>
			<header className="flex p-1">
				<div>GroupMemberList {`(${activeUsers.length})`}</div>
				<div className="flex-1"></div>
				<div className="mr-2"></div>
			</header>
			<div
				className={`h-[500px] w-full px-2 overflow-y-scroll overflow-x:hidden scroll-smooth ${styles.hover}`}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				{activeUsers.map(user => (
					<div key={user.id} className="flex items-center mb-4">
						<Image src="/img/ui/avatar.jpg" width={30} height={30} alt="user-img" />
						<p className="ml-4">
							{user.username}
							{user.role === 'owner' && ' 👑'}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default GroupMembers
