import editFormStore from "../../store/editFormStore"
import menuStore from '../../store/menuStore'
import * as I from '../../store/storeInterfaces';
import { useState } from "react";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { uploadFoodApi } from "../../api/uploadApi";
import { UseEditFormFood } from "./editFormFood.props";
import C from './editFormFood.module.scss'
import useToast from '../toast'

const useEditFormFood:UseEditFormFood = (data:I.EditFormFoodData) => {

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

    const [showToast] = useToast()
    if (data===undefined) data = editFormStore.emptyFood

    //эта жуть конвертирует строку в специальный формат для редактора
    let [editorState, setEditorState] = useState<EditorState>(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(data.info).contentBlocks)))

    const handleInputChange = (field: string, value: string) => {
        switch (field) {
            case 'name':
                editFormStore.setData({...state.data, name:value}); break;
            case 'price':
                editFormStore.setData({...state.data, price:Number(value)}); break;        
            default: break;
        }
    }

    const handleEditorChange = (value: EditorState) => {
        setEditorState(value)
        editFormStore.setData({...data as I.Food, info:draftToHtml(convertToRaw(value.getCurrentContent()))})
    }

    const handleApprove = () => {
        console.log('handleApprove')
        console.log(data)
        uploadFoodApi(data, (data as I.Food).id )
        .then(result => {
            console.log(result)
            if (typeof result!=='string') {    
                editFormStore.setData(result)
                menuStore.editFood(result, (data as I.Food).id )
                showToast('Отредактировано: '+result.id);
            } else {
                showToast(result);
            }
        })
    }

    const state = {
        editorToolbarProps,
        editorState,
        data,
    }
    const api = {
        handleInputChange,
        handleEditorChange,
        handleApprove,
    }
    
    return (
        [state,api]
    )
}

export default useEditFormFood