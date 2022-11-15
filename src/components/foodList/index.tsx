import {observer, inject} from "mobx-react";
import {FoodList} from './foodList'

export default
	inject('menuStore')
	(observer(FoodList));