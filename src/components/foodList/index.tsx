import {observer, inject} from "mobx-react";

import useFood from './hook'
import FoodCard from '../foodCard'
import EditForm from '../editForm'
import editFormStore from "../../store/setStore";

const FoodList = () => {
    const [food] = useFood()    
    console.log(food)


    return (
        <>
        {food.filteredFood.map((item, id) => <FoodCard {...item} key={id} />)}

        <EditForm />
        </>
    )
}

export default
	inject('editFormStore')
	(observer(FoodList));
