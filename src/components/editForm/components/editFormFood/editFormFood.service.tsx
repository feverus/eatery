import { useState } from "react"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, ContentState } from "draft-js"
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import * as I from '~Store/storeInterfaces'
import menuStore from '~Store/menuStore'
import editFormStore from "~Store/editFormStore"
import { deleteImagesApi } from "~Api/deleteApi"
import { uploadFoodApi, uploadImageApi } from "~Api/uploadApi"
import useToast from '~Components/toast'
import C from './editFormFood.module.scss'
import { UseEditFormFood } from "./editFormFood.props"

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

const useEditFormFood:UseEditFormFood = (data:I.Food) => {
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

    const handleApprove = async () => {
        const fd = (editFormStore.formData as I.Food)
        let id:string = ''
        const newId = ((data as I.Food).id==='') ? true : false
        let toastMessage = 'Отредактировано: '

        if (newId) {
            toastMessage = 'Создано: '
            await uploadFoodApi(data, '' )
            .then(result => {
                if (typeof result!=='string') {    
                    id = result.id
                    editFormStore.setData({...fd, 'version': fd.version + 1})
                } else {
                    showToast(result);
                }
            })   
        } else {
            id = (data as I.Food).id
        }  
        
        if (editFormStore.rawImages.length>0) {
            await uploadImageApi(editFormStore.rawImages, id)
            .then(result => {
                if (typeof result!=='string') {
                    const newImages = fd.images.concat(result)
                    editFormStore.setData({...fd, images:newImages})
                }
            })
        }

        if (editFormStore.imagesToDelete.length>0) {
            await deleteImagesApi(editFormStore.imagesToDelete, id)
        }     


        await uploadFoodApi(editFormStore.formData, id)
        .then(result => {
            console.log(result)
            if (typeof result!=='string') {    
                editFormStore.setData({...result, 'version': fd.version + 1})
                if (newId) menuStore.addFood(result)
                else menuStore.editFood(id, result)
                showToast(toastMessage + id);
            } else {
                showToast(result);
            }
        }) 

        editFormStore.closeForm()      
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