import {observer, inject} from "mobx-react";
import {EditFormFood} from './editFormFood'

export default
	inject('editFormStore', 'menuStore')
	(observer(EditFormFood));