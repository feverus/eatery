import editFormStore from "~Store/editFormStore"
import { Button, Classes, Overlay, Card, Divider, ControlGroup, ButtonGroup } from "@blueprintjs/core";
import C from './editFormSection.module.scss'
import useDragable from "./editFormSection.dragable"
import useEditFormSection from './editFormSection.service'
import { SectionItemEditorListType } from "./editFormSection.props"
import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { SectionItemEditor } from './SectionItemEditor';

const SectionItemEditorList = React.memo(
  function SectionItemEditorList({ sections, api }:SectionItemEditorListType) {
    return (
      <>{
        sections.map((item, index) => 
          <Draggable
            draggableId={'section_' + item.id}
            index={index}
            key={'section_' + item.id}
          >
            {provided => (
              <div              
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <SectionItemEditor                
                  id={item.id}
                  api={api}
                />
              </div>
            )}
          </Draggable>
        )
      }</>
    )
  }
)

export function EditFormSection() {    
	const api = useEditFormSection()
  const [dragState, dragApi] = useDragable()

	return (
		<Overlay
			isOpen={true}
			className={Classes.OVERLAY_SCROLL_CONTAINER + ' ' + C.outCard}
			onClose={()=>editFormStore.closeForm()}
			>
			<Card className={C.card}>
				<h3>Список категорий</h3>

        <DragDropContext onDragEnd={() => dragApi.onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <SectionItemEditorList sections={dragState.sections} api={api} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

				<SectionItemEditor
          id={''}
          api={api}
        />				

				<Divider />
				<ControlGroup fill={false} vertical={false}>
					<ButtonGroup minimal={true}>
						<Button
							icon="small-cross"
							onClick={()=>editFormStore.closeForm()}
						>Выйти</Button>
					</ButtonGroup>  
				</ControlGroup>
			</Card>            
		</Overlay>
	)
}