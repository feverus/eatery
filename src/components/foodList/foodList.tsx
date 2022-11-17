import useFoodList from './foodList.service'
import FoodCard from '../foodCard/'
import SectionHeader from '../sectionHeader/'
import EditForm from '../editForm'
import C from './foodList.module.scss'
import setStore from '../../store/setStore'
import { Button } from '@blueprintjs/core'

export function FoodList() {
    const [food, api] = useFoodList()

    return (
        <div className={C.list}>
            {setStore.role=='admin' && 
                <Button icon="add"
                    onClick={() => api.openEditForm()}
                >
                    Добавить блюдо
                </Button>}
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