import * as I from '~Store/storeInterfaces'
import menuStore from '~Store/menuStore'
import { deleteApi } from "~Api/deleteApi"
import { uploadAllFoodApi, uploadSectionApi } from "~Api/uploadApi"
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
        let newFood: I.Food[] = [], changedIds: string[] = []  

        menuStore.food.forEach(item => {
            console.log(item.section, id)
            if (item.section === id) {
                newFood.push({...item, section: '', version: item.version + 1})
                changedIds.push(item.id)
            }
        })

        deleteApi(id, 'section')
        uploadAllFoodApi(newFood, changedIds)
        
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