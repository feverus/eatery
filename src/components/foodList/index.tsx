import {observer, inject} from "mobx-react";

import useFood from './hook'
import FoodCard from '../foodCard'
import SectionHeader from '../foodCard/sectionHeader'
import EditForm from '../editForm'
import editFormStore from "../../store/setStore";

import C from '../../styles/foodList.module.css'

const FoodList = () => {
    const [food] = useFood()    
    console.log(food)


    return (
        <div className={C.list}>
            {
            //food.filteredFood.map((item, id) => <FoodCard {...item} key={id} />)
            }
            {food.sectionedFood.map((item, id) => (typeof item === 'string')?
            <SectionHeader item={item} key={id} />
            :
            <FoodCard {...item} key={id} />)}

            <EditForm />
        </div>
    )
}

export default
	inject('editFormStore')
	(observer(FoodList));
