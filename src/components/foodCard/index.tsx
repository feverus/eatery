import {observer, inject} from "mobx-react";
import {FoodCard} from './foodCard'

export default
	inject('editFormStore')
	(observer(FoodCard));

export type { UseFoodCard, ControlCallback } from './foodCard.props'