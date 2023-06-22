import { useState } from "react"
import * as I from '~Store/storeInterfaces'
import menuStore from '~Store/menuStore'
import { deleteApi } from "~Api/deleteApi"
import { uploadTagApi } from "~Api/uploadApi"
import useToast from '~Components/toast'
import { UseEditFormTag } from "./editFormTag.props"

const useEditFormSection:UseEditFormTag = () => {
	const [showToast] = useToast()
	const [data, setData] = useState<I.Tag[]>(menuStore.tag.slice())
	const [editMode, setEditMode] = useState(false)
	const [editedTag, setEditedTag] = useState('')
	const [editableValue, setEditableValue] = useState('')

	const onEditMode = (value: string) => {
		setEditMode(true)
		setEditedTag(value)
		setEditableValue(value)
	}

	const offEditMode = (save: boolean) => {
		setEditMode(false)
		if (save) edit(editedTag, editableValue)
	}

	const add = (names: string[]) => {
		let itemsToAdd:I.Tag[] = []

		names.forEach(name => {
			if (data.find(item => item.name===name) === undefined) 
			handleApprove({id: '', name: name, version: 0})
			.then(res => {if (res.id !== '') itemsToAdd.push(res)})
		})

		setData([...data, ...itemsToAdd])
	}

	const remove = (name: string) => {		

		const finded = data.find(item => item.name===name)

		if (finded !== undefined) {
			deleteApi(finded.id, 'tag')
			setData(data.filter(item => item.id !== finded.id))
			menuStore.removeTag(finded.id)
			showToast('Удалено: ' + name)
		}
	}

	const edit = (oldName: string, newName: string) => {
		const findedOld = data.find(item => item.name===oldName)
		const findedNew = data.find(item => item.name===newName)

		if (findedOld !== undefined && findedNew === undefined) {
			const newItem = {id: findedOld.id, name: newName, version: findedOld.version + 1}
			handleApprove(newItem)
			.then(res=> {
				setData([...data.filter(item => item.id !== findedOld.id), newItem])
			})
		}
	}

	const handleApprove = async (newTag:I.Tag):Promise<I.Tag> => {
		const newId = (newTag.id==='') ? true : false
		const toastMessage = (newId) ? 'Создано: ' : 'Отредактировано: '
		let answer = newTag
		
		await uploadTagApi(newTag, newTag.id )
		.then(result => {
			if (typeof result!=='string') {    
				const id = (newId) ? result.id : newTag.id
				if (newId) menuStore.addTag(result)
				else menuStore.editTag(id, result)				
				showToast(toastMessage + result.name)
				answer = result
			} else {
				showToast(result);
			}
		})

		return answer
	}

	const state = {
		data: data.slice().sort((a,b) => a.name.localeCompare(b.name)),
		editMode: editMode,
		editedTag: editedTag,
		editableValue: editableValue,
	}

	const api = {
		add: add,
		remove: remove,
		edit: edit,
		onEditMode: onEditMode,
		offEditMode: offEditMode,
		setEditableValue: setEditableValue,
	}
	
	return (
		[state, api]
	)
}

export default useEditFormSection