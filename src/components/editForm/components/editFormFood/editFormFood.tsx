import {observer} from "mobx-react"
import * as I from '~Store/storeInterfaces'
import editFormStore from "~Store/editFormStore"
import {ImageUploader} from "~Components/editForm"
import { Button, Classes, Overlay, Card, Divider, ControlGroup, ButtonGroup, InputGroup, Switch } from "@blueprintjs/core"
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import C from './editFormFood.module.scss'
import { useEditFormFood, useSections, useTags } from './editFormFood.service'
import { CategorySelect } from './CategorySelect'
import { TagSelect } from './TagSelect'

export function EditFormFood() {    
	const [state, api] = useEditFormFood(editFormStore.formData as I.Food)
	const sections = useSections()
	const tags = useTags()

	return (
		<Overlay
			isOpen={true}
			className={Classes.OVERLAY_SCROLL_CONTAINER}
			onClose={()=>editFormStore.closeForm()}
			canOutsideClickClose={false}
			>
			<Card className={C.card}>
				<h3>Название блюда</h3>
				<InputGroup
					id="text-input"
					value={state.data.name}
					onChange={(e)=>api.handleInputChange('name', e.target.value)} />

				<h3>Категория</h3>  
				<CategorySelect
					items={sections}
					selectedId={state.data.section}
					onSelect={api.handleInputChange}
				/>

				<div className={C.twoColumn}>
					<div className={C.column}>
						<h3>Цена</h3>
						<InputGroup
							id="text-input"
							type="number"
							value={state.data.price.toString()}
							onChange={(e)=>api.handleInputChange('price', e.target.value)} />
					</div>

					<div className={C.column}>
						<h3>Доступно для заказа клиентом</h3>
						<Switch
							checked={state.data.hidden}
							innerLabel="Доступно"
							innerLabelChecked="Скрыто"
							onChange={(e)=>api.handleInputChange('hidden', (!state.data.hidden).toString())}
						/>
					</div>
				</div>

				<h3>Фотографии</h3>
				<ImageUploader />

				<h3>Информация:</h3>
				<Editor
					editorState={state.editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="wrapperClassName"
					editorClassName={C.editorMain}
					onEditorStateChange={(value) => api.handleEditorChange(value)}
					toolbar={state.editorToolbarProps}
					/>

				<h3>Тэги</h3>
				<TagSelect
					items={tags}
					selectedIds={state.data.tags}
					onSelect={api.handleInputChange}
				/>

				<Divider />

				<ControlGroup fill={false} vertical={false}>
					<ButtonGroup minimal={true}>
						<Button
							icon="cloud-upload" 
							onClick={()=>api.handleApprove()}
						>Сохранить</Button>
						<Button
							icon="small-cross"
							onClick={()=>editFormStore.closeForm()}
						>Отмена</Button>
					</ButtonGroup>  
				</ControlGroup>
			</Card>            
		</Overlay>
	)
}

export default (observer(EditFormFood))