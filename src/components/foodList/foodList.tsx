import useFood from './foodList.service'
import FoodCard from '../foodCard/'
import SectionHeader from '../sectionHeader/'
import EditForm from '../editForm'
import C from './foodList.module.scss'

export function FoodList() {
    const [food] = useFood()    
    console.log('FoodList')
    console.log(food)

    return (
        <div className={C.list}>
            {
            //food.filteredFood.map((item, id) => <FoodCard {...item} key={id} />)
            }
            {food.sectionedFood.map((item, id) => (typeof item === 'string')?
                <SectionHeader item={item} key={id} />:
                <FoodCard {...item} key={id} />)}

            <EditForm />
        </div>
    )
}