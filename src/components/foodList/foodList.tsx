import setStore from '~Store/setStore'
import { FoodCard } from './components/foodCard'
import EditForm from '~Components/editForm'
import SectionHeader from '~Components/sectionHeader/'
import C from './foodList.module.scss'
import { Alignment, Button, ButtonGroup } from '@blueprintjs/core'
import useFoodList from './foodList.service'

export function FoodList() {
	const [food, api] = useFoodList()

	return (
		<div className={C.list}>
			{setStore.role=='admin' && 
				<ButtonGroup alignText={Alignment.CENTER} vertical={setStore.mobileView}>
					<Button icon="add" onClick={() => api.openEditForm('food')} >
						Добавить блюдо
					</Button>
					<Button icon="edit" onClick={() => api.openEditForm('section')} >
						Управление категориями
					</Button>
					<Button icon="edit" onClick={() => api.openEditForm('tag')} >
						Управление тэгами
					</Button>

				</ButtonGroup>
			}

			{food.sectionedFood.map((item) => (typeof item === 'string')?
				<SectionHeader item={item} key={'header_'+item} />
				:
				<FoodCard {...item} key={item.id} />)
			}
			<EditForm />
		</div>
	)
}