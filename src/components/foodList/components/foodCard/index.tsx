import {observer} from "mobx-react";
import {FoodCard as FoodCardBefore} from './foodCard'

export { useFoodCard } from "./foodCard.service"
export const FoodCard = (observer(FoodCardBefore))
export type { UseFoodCard } from './foodCard.props'