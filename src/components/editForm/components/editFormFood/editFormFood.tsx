import * as I from '~Store/storeInterfaces'
import editFormStore from "~Store/editFormStore"
import ImageUploader from "~Components/editForm/components/imageUploader"
import { Button, Classes, Overlay, Card, Divider, ControlGroup, ButtonGroup, InputGroup, MenuItem } from "@blueprintjs/core"
import { ItemRenderer, Select2 } from "@blueprintjs/select"
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import C from './editFormFood.module.scss'
import useEditFormFood from './editFormFood.service'
import { SectionSelectItem, CategorySelectProps } from './editFormFood.props' 
import { useEffect, useState } from 'react'

const renderSections: ItemRenderer<SectionSelectItem> = (item, { handleClick, handleFocus, modifiers, query }) => {
	return (
		<MenuItem
			active={modifiers.active}
			disabled={modifiers.disabled}
			key={item.rank}
			//label={item.title}
			onClick={handleClick}
			onFocus={handleFocus}
			roleStructure="listoption"
			text={item.title}
		/>
	)
}

const CategorySelect = (props: CategorySelectProps) => {
	const {items, selectedId, onSelect} = props
	const [selected, setSelected] = useState<SectionSelectItem | undefined>()

	useEffect(() => {
		if (items.length > 0) 
			if (selectedId==='') setSelected(items[0])
			else {
				setSelected(items.find(item => item.id === selectedId))
				onSelect('section', selectedId)
			}
	}, [items])	

	return (
		<Select2<SectionSelectItem>
			items={items}
			activeItem={selected}
			fill={true}
			filterable={false}
			itemRenderer={renderSections}
			noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
			onItemSelect={setSelected}
			onActiveItemChange={(item) => onSelect('section', item?.id ?? '')}
			popoverProps={{matchTargetWidth:true}}
			className={C.select}
		>
			<Button
				text={selected?.title}
				rightIcon="double-caret-vertical"
				placeholder="Выбрать категорию" 
				className={C.button}
			/>
		</Select2>
	)
}

export function EditFormFood() {    
	const [state, api] = useEditFormFood(editFormStore.formData as I.Food)

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
					items={state.sections}
					selectedId={state.data.section}
					onSelect={api.handleInputChange}
				/>

				<h3>Цена</h3>
				<InputGroup
					id="text-input"
					type="number"
					value={state.data.price.toString()}
					onChange={(e)=>api.handleInputChange('price', e.target.value)} />

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