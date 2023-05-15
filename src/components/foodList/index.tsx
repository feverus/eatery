import {observer} from "mobx-react"
import {FoodList} from './foodList'

export {FoodCard, useFoodCard} from './components/foodCard'
export {FoodDetail} from './components/foodDetail'
export default (observer(FoodList))