import setStore from '~Store/setStore'
import { FoodCard } from './components/foodCard'
import EditForm from '~Components/editForm'
import SectionHeader from '~Components/sectionHeader/'
import C from './foodList.module.scss'
import { Button } from '@blueprintjs/core'
import useFoodList from './foodList.service'

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