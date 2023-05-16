import { useState } from "react"
import * as I from '~Store/storeInterfaces'
import menuStore from '~Store/menuStore'
import editFormStore from "~Store/editFormStore"
import { deleteApi } from "~Api/deleteApi"
import { uploadSectionApi } from "~Api/uploadApi"
import useToast from '~Components/toast'
import { UseEditFormSection } from "./editFormSection.props"

const useEditFormSection:UseEditFormSection = () => {
    const [showToast] = useToast()

    const handleApprove = async (data:I.Section) => {
        const newId = (data.id==='') ? true : false
        const toastMessage = (newId) ? 'Создано: ' : 'Отредактировано: '

        await uploadSectionApi(data, '' )
        .then(result => {
            if (typeof result!=='string') {    
                const id = (newId) ? result.id : data.id
                if (newId) menuStore.addSection(result)
                else menuStore.editSection(id, result)
                showToast(toastMessage + id)
            } else {
                showToast(result);
            }
        })     
    }

    const handleDelete = (id: string) => {
        deleteApi(id, 'section')
        menuStore.removeSection(id)
    }

    const api = {
        handleApprove,
        handleDelete,
    }
    
    return (
        api
    )
}

export default useEditFormSection