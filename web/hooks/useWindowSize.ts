'use client'

import { useEffect, useState } from 'react'

const useWindowSize = () => {
	// to resolve the window Object can't be find in server side
	const [state, setState] = useState({
		winWidth: window.innerWidth,
		winHeight: window.innerHeight,
	})

	useEffect(() => {
		const handler = () => {
			setState({
				winWidth: window.innerWidth,
				winHeight: window.innerHeight,
			})
		}
		window.addEventListener('resize', handler)
		return () => {
			window.removeEventListener('resize', handler)
		}
	}, [])

	return state
}

export default useWindowSize
