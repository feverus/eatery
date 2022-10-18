import useFood from './hook'
import FoodCard from '../foodCard'

const FoodList = () => {
    const [food] = useFood()    
    console.log(food)
    return (
        <>
        {food.filteredFood.map((item, id) => <FoodCard {...item} key={id} />)}
        </>
    )
}

export default FoodList