import editFormStore from "~Store/editFormStore"
import { Button, Classes, Overlay, Card, ControlGroup, ButtonGroup, TagInput, InputGroup, TagProps, Intent, Callout } from "@blueprintjs/core"
import C from './editFormTag.module.scss'
import useEditFormSection from "./editFormTag.service"
import { EditableTagProps } from "./editFormTag.props"

const getTagProps = (_v: React.ReactNode, index: number): TagProps => ({
	intent: Intent.NONE,
	minimal: true,
})

const EditableTag = (props: EditableTagProps) => {
	return (
		<Button
			onClick={() => props.onEditMode(props.name)}
			minimal
			className={C.editButton}
		>
			{props.name}
		</Button>
	)
}

export function EditFormTag() {    
	const [state, api] = useEditFormSection()

	return (
		<Overlay
			isOpen={true}
			className={Classes.OVERLAY_SCROLL_CONTAINER + ' ' + C.outCard}
			onClose={() => editFormStore.closeForm()}
		>
			<Card className={C.card}>
				<h3>Список тэгов</h3>
				<p>Введите список тэгов, разделяя их нажатием ENTER. Вы можете ввести (или вставить из буфера обмена) несколько тэгов, разделенных запятой. 
				Предпочтительнее редактировать имеющийся тэг, чем создавать новый. Просто кликните по нему для перехода в режим редактирования.</p>
				<Callout title={"Совет"} icon={'high-priority'}>
						Если вам нужна запятая внутри тэга, вы можете добавить её в режиме редактирования!
				</Callout>
				<TagInput
					fill={true}
					addOnBlur={true}
					addOnPaste={true}
					className={C.tagInput}
					leftIcon={"tag"}
					placeholder="Пустой список тэгов. Добавьте что-нибудь"
					tagProps={getTagProps}
					onAdd={(values, method) => api.add(values)}
					onRemove={(value, index) =>  api.remove((value as any)?.props?.name ?? '')}
					values={state.data.map(item => 
						<EditableTag
							key={item.name}
							name={item.name}
							onEditMode={api.onEditMode}
						/>
					)}
        />

				<ControlGroup fill={false} vertical={false}>
					<ButtonGroup minimal={true}>
						<Button
							icon="small-cross"
							onClick={()=>editFormStore.closeForm()}
						>Выйти</Button>
					</ButtonGroup>  
				</ControlGroup>
			</Card>   

			{state.editMode && 
				<div className={C.editForm}>
					<InputGroup
						onChange={e => api.setEditableValue(e.target.value)}
						value={state.editableValue}
						className={C.editableTag}
						onBlur={() => api.offEditMode(false)}
						onKeyDown={e => (e.code === 'Enter' || e.code === 'NumpadEnter') && api.offEditMode(true)}
						autoFocus
					/>
					<Button
						onClick={() => api.offEditMode(true)}
						intent='primary'
					>
						ОК
					</Button>
					<Button
						onClick={() => api.offEditMode(false)}
					>
						Отмена
					</Button>
				</div>
		}         
		</Overlay>


	)
}