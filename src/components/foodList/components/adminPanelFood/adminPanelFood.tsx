import setStore from '~Store/setStore'
import { Alignment, Button, ButtonGroup } from '@blueprintjs/core'
import C from './adminPanelFood.module.scss'

export function AdminPanelFood(api: { openEditForm: (formType: string) => void; }) {
	return (
		<ButtonGroup alignText={Alignment.CENTER} vertical={setStore.mobileView} className={C.adminPanel}>
			<Button icon="add" onClick={() => api.openEditForm('food')}>
				Добавить блюдо
			</Button>
			<Button icon="edit" onClick={() => api.openEditForm('section')}>
				Управление категориями
			</Button>
			<Button icon="edit" onClick={() => api.openEditForm('tag')}>
				Управление тэгами
			</Button>
		</ButtonGroup>
	)
}
