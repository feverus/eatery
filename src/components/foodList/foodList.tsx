import setStore from '~Store/setStore'
import { EditForm } from '~Components/editForm'
import SectionHeader from '~Components/sectionHeader/'
import FilterPanel from './components/filterPanel'
import { FoodCard } from './components/foodCard'
import { AdminPanelFood } from './components/adminPanelFood'
import C from './foodList.module.scss'
import useFoodList from './foodList.service'
import { NonIdealState, NonIdealStateIconSize } from '@blueprintjs/core'

export function FoodList() {
	const [food, api] = useFoodList()

	const showFiltered = food.filteredFood.length > 0 ?
		food.filteredFood.map((item) => <FoodCard {...item} key={item.id} />)
		:
		<NonIdealState
			icon={'search'}
			iconSize={NonIdealStateIconSize.STANDARD}
			title='Поиск не дал результатов'
			description='Попробуйте задать менее стргие критерии для поиска'
			className={C.notFound}
		/>

	const showAll = food.sectionedFood.length > 0 ? 
		food.sectionedFood.map((item) => (typeof item === 'string') ?
			<SectionHeader item={item} key={'header_' + item} />
			:
			<FoodCard {...item} key={item.id} />)
		:
		<NonIdealState
			icon={'bug'}
			iconSize={NonIdealStateIconSize.STANDARD}
			title='Ошибка получения меню'
			description='Попробуйте открыть страницу в режиме инкогнито или удалить cookies и сохраненные данные'
			className={C.notFound}
		/>

	return (
		<div className={C.list}>
			{setStore.role==='admin' &&  AdminPanelFood(api)}

			<FilterPanel />

			{setStore.foodFilterActive ? showFiltered : showAll}

			<EditForm />
		</div>
	)
}