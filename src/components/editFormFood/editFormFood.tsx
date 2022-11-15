import editFormStore from "../../store/editFormStore"
import { Button, Classes, Overlay, Card, Divider, ControlGroup, ButtonGroup, InputGroup } from "@blueprintjs/core";
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import C from './editFormFood.module.scss'
import useEditFormFood from './editFormFood.service'
import ImageUploader from "../imageUploader";

export function EditFormFood() {    
    const [state, api] = useEditFormFood(editFormStore.formData)

    return (
        <Overlay
            isOpen={true}
            className={Classes.OVERLAY_SCROLL_CONTAINER}
            onClose={()=>editFormStore.closeForm()}
            >
            <Card className={C.card}>
                <h3>Название блюда</h3>
                <InputGroup
                    id="text-input"
                    value={state.data.name}
                    onChange={(e)=>api.handleInputChange('name', e.target.value)} />
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