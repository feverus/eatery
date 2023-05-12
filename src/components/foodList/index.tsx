import {observer} from "mobx-react"
import {FoodList} from './foodList'

export {FoodCard, useFoodCard} from './components/foodCard'
export default (observer(FoodList));