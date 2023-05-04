import {observer, inject} from "mobx-react"
import {Main} from './main'

export default
	inject('setStore')
	(observer(Main));
