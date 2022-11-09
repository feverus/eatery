import editFormStore from "../../store/editFormStore"
import * as I from '../../store/storeInterfaces';
import { useState, useRef, useEffect } from "react";
import { Button, Classes, Overlay, Card, Divider, ControlGroup, ButtonGroup, InputGroup } from "@blueprintjs/core";
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import C from './editForm.module.scss'
import { uploadFoodApi } from "../../api/uploadApi";
import useToast from '../toast'

const editorToolbarProps = {
    inline: {
        monospace: { className: C.hidden },
        superscript: { className: C.hidden },
        subscript: { className: C.hidden },
    },
    blockType: { inDropdown: true },
    list: {
        inDropdown: true
    },
    textAlign: {
        inDropdown: true
    },
    fontFamily: { inDropdown: true },      
    colorPicker: { className: C.hidden },             
    emoji: { className: C.hidden },
    link: { className: C.hidden },
    unlink: { className: C.hidden },
    embedded: { className: C.hidden },
    image: { className: C.hidden },
    
}


export function EditFormFood() {
    console.log('EditFormFood-')
    console.log(editFormStore.formData)

    const [showToast] = useToast()
    let data = editFormStore.formData as I.Food
    //let data = JSON.parse(JSON.stringify(editFormStore.formData as I.Food));

    //эта жуть конвертирует строку в специальный формат для редактора
    let [editorState, setEditorState] = useState<EditorState>(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(data.info).contentBlocks)))

    const handleEditorChange = (value: EditorState) => {
        setEditorState(value)
        editFormStore.setData({...data, info:draftToHtml(convertToRaw(value.getCurrentContent()))})
    }

    const handleApprove = () => {
        console.log('handleApprove')
        console.log(data)
        uploadFoodApi(data, (data as I.Food).id as string)
        .then(result => {
            console.log(result)
            if (typeof result!=='string') {     
                showToast('Отредактировано: '+result.id);
            } else {
                showToast(result);
            }
        })
    }

    return (
        <Overlay isOpen={true}
            className={Classes.OVERLAY_SCROLL_CONTAINER}
            onClose={()=>editFormStore.closeForm()}
            >
            <Card className={C.card}>
                Название блюда
                <InputGroup
                    id="text-input"
                    value={data.name}
                    onChange={(e)=>editFormStore.setData({...data, name:e.target.value})} />
                Цена
                <InputGroup
                    id="text-input"
                    type="number"
                    value={data.price.toString()}
                    onChange={(e)=>editFormStore.setData({...data, price:Number(e.target.value)})} />
                Информация:
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName={C.editorMain}
                    onEditorStateChange={(value) => handleEditorChange(value)}
                    toolbar={editorToolbarProps}
                    />

                <Divider />
                <ControlGroup fill={false} vertical={false}>
                    <ButtonGroup minimal={true}>
                        <Button
                            icon="cloud-upload"                        
                            onClick={()=>handleApprove()}
                        >Сохранить</Button>
                        <Button
                            icon="small-cross"
                            onClick={()=>editFormStore.closeForm()}
                        >Закрыть</Button>
                    </ButtonGroup>  
                </ControlGroup>
            </Card>
            
        </Overlay>
    )
}