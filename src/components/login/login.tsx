import setStore from '../../store/setStore'
import useLogin from "./login.service";
import C from './login.module.scss'

export function Login() {
	const [state, api] = useLogin() 

	return (
		state.showLogin?
		<>форма логина</>
		:
		<>role: {setStore.role}</>
	)
}