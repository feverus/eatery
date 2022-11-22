import {observer, inject} from "mobx-react";
import {Login} from './login'

export default
	inject('setStore')
	(observer(Login));

export type { StateType, ApiType, UseMain } from './login.props'