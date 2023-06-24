import { Login } from '@/api/login'
import useAlertStore, { AlertType } from '@/stores/alert'
import useAppsStore from '@/stores/apps'
import useUserStore from '@/stores/user'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

const LoginWindow = () => {
	const alert = useAlertStore(state => state.alert)
	const [openApp, closeApp] = useAppsStore(state => [state.openApp, state.closeApp])
	const [setToken, setUserInfo] = useUserStore(state => [state.setToken, state.setUserInfo])
	const [authInfo, setAuthInfo] = useState({
		username: '',
		password: '',
	})

	const handleInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
		setAuthInfo({ ...authInfo, [key]: e.target.value })
	}
	const submit = async () => {
		if (!authInfo.username) return alert(AlertType.WARNING, 'please input your username')
		if (!authInfo.password) return alert(AlertType.WARNING, 'please input your password')

		const res = await Login({ username: authInfo.username, password: authInfo.password })
		console.log(res)
		if (res.code === 200) {
			setToken(res.data.token)
			setUserInfo(res.data.userInfo)
			localStorage.setItem('turbomac_token', res.data.token)
			localStorage.setItem('turbomac_userInfo', JSON.stringify(res.data.userInfo))
			alert(AlertType.SUCCESS, 'login success')
			closeApp('login')
			openApp('turbomac')
		} else {
			alert(AlertType.ERROR, 'Unauthorized')
		}
	}
	return (
		<div
			className="flex flex-col w-full h-full space-y-4 overflow-hidden bg-center bg-cover rounded-b-md p-[32px]"
			style={{
				backgroundImage: 'url(/img/ui/loginbg.png',
			}}
		>
			<div className="mt-[32px] mb-[12px] flex-center">
				<Image src="/img/icons/turbochat.png" className="bg-white rounded-full" width={80} height={80} alt="qqavatar" />
			</div>
			<input
				type="text"
				placeholder="Type your username"
				className="input w-full max-w-xs"
				value={authInfo.username}
				onChange={e => handleInput(e, 'username')}
			/>
			<input
				type="password"
				placeholder="Type your password"
				className="input w-full max-w-xs"
				value={authInfo.password}
				onChange={e => handleInput(e, 'password')}
			/>
			<button onClick={submit} className="btn btn-info">
				Log In / Sign Up
			</button>
			<div className="w-full h-auto  pt-[20px] flex-center">
				<span className="text-xs text-primary hover:cursor-pointer">扫码登录</span>
				<span className="mx-2">|</span>
				<span className="text-xs text-primary hover:cursor-pointer ">更多选项</span>
			</div>
		</div>
	)
}

export default LoginWindow
