import { UserInfo } from '@/types'
import { post } from '@/utils/http'

interface AuthInfo {
	username: string
	password: string
}

interface LoginData {
	token: string
	userInfo: UserInfo
}

export function Login({ username, password }: AuthInfo) {
	return post<LoginData>('/auth/login', { username, password })
}
