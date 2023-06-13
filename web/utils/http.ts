interface Res<T> {
	code: number
	message: string
	data: T
}

const HOST = 'http://localhost:8080'

const get = async <T>(api: string, option?: RequestInit): Promise<Res<T>> => {
	const token = localStorage.getItem('token')
	const res = await fetch(`${HOST}${api}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '',
		},
		...option,
	})

	return await res.json()
}

const post = async <T>(api: string, data: any, option?: RequestInit): Promise<Res<T>> => {
	debugger
	const token = localStorage.getItem('token')
	const res = await fetch(`${HOST}${api}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '',
		},
		body: JSON.stringify(data),
		...option,
	})

	return await res.json()
}

export { get, post }
