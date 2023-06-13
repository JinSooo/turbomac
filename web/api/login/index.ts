import { post } from '@/utils/http'

interface AuthInfo {
	username: string
	password: string
}

interface LoginData {
	token: string
	userInfo: {
		id: string
		username: string
		avatar: string
		role: string
		createAt?: Date
	}
}

export function Login({ username, password }: AuthInfo) {
	return post<LoginData>('/auth/login', { username, password })
}
