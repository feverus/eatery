import useLogin from "./login.service";
import { Button, Card, Elevation, Icon, InputGroup } from "@blueprintjs/core";
import {Link} from 'react-router-dom'
import C from './login.module.scss'
import setStore from "../../store/setStore";

export function Login() {
	const [state, api] = useLogin() 

	return (
		<div className={C.shell}>
			<Card 
				elevation={Elevation.TWO} 
				className={C.card}
			>
				<Link to={'/'} className={C.closeButton}>
					<Icon icon={'cross'} size={24} intent={'danger'} />
				</Link>

				<h3>Авторизация:</h3>
				<InputGroup
					id="login" placeholder="Имя пользователя"
					onChange={el => api.setInputLogin(el.target.value)}
				/>
				<InputGroup
					id="password" placeholder="Пароль"
					onChange={el => api.setInputPassword(el.target.value)}  
				/>
				<Button
					onClick={api.login}
					intent={'success'}
				>
					Войти
				</Button>
				
				{setStore.role!=='client' && 
					<Button
						onClick={api.logout}
						intent={'danger'}
					>
						Выйти
					</Button>
				}
			</Card>
		</div>
	)
}