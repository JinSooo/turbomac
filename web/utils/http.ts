interface Res<T> {
	code: number
	message: string
	data: T
}

const HOST = 'http://localhost:8080'

export const get = async <T>(api: string, option?: RequestInit): Promise<Res<T>> => {
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

export const post = async <T>(api: string, data: any, option?: RequestInit): Promise<Res<T>> => {
	const token = localStorage.getItem('turbomac_token')
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

export const upload = async <T>(api: string, file: File): Promise<Res<T>> => {
	const token = localStorage.getItem('turbomac_token')
	const formData = new FormData()
	formData.append('file', file, encodeURI(file.name))

	const res = await fetch(`${HOST}${api}`, {
		method: 'POST',
		headers: {
			// 上传文件这边不需要加form-data头部，fetch会自动加
			Authorization: token ? `Bearer ${token}` : '',
		},
		body: formData,
	})

	return await res.json()
}
