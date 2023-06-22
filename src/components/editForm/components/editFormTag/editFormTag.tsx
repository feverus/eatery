import editFormStore from "~Store/editFormStore"
import { Button, Classes, Overlay, Card, Divider, ControlGroup, ButtonGroup, TagInput, InputGroup } from "@blueprintjs/core"
import C from './editFormTag.module.scss'
import useEditFormSection from "./editFormTag.service"
import { EditableTagProps } from "./editFormTag.props"

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
			onClose={()=>editFormStore.closeForm()}
			>
			<Card className={C.card}>
				<h3>Список тэгов</h3>

				<TagInput
					leftIcon={"tag"}
					onAdd={(values, method) => api.add(values)}
					onRemove={(value, index) => 
						api.remove((value as any)?.props?.name ?? '')
					}
					placeholder="Введите список тэгов, разделяя их нажатием ENTER"
					values={state.data.map(item => 
						<EditableTag
							key={item.name}
							name={item.name}
							onEditMode={api.onEditMode}
						/>
					)}
					fill={true}
					addOnBlur={true}
					addOnPaste={true}
					large={true}
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
						autoFocus
					/>
					<Button onClick={() => api.offEditMode(true)}>
						ОК
					</Button>
					<Button onClick={() => api.offEditMode(false)}>
						Отмена
					</Button>
				</div>
		}         
		</Overlay>


	)
}