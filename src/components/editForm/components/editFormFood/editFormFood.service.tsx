import { useEffect, useState } from "react"
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
import { SectionSelectItem, TagSelectItem, UseEditFormFood } from "./editFormFood.props"

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

export const useSections = () => {
	const [sections, setSections] = useState<SectionSelectItem[]>([])

	useEffect(() => {        
		setSections(menuStore.section.map((item, index) => ({
			title: item.name,
			id: item.id,
			rank: index + 1
		})))    
	}, [menuStore.section])	

	return sections
}

export const useTags = () => {
	const [tags, setTags] = useState<TagSelectItem[]>([])

	useEffect(() => {     
		let newTags = menuStore.tag.map(
			(item, index) => ({
				title: item.name,
				id: item.id,
				rank: index + 1
			}))
		.slice()
		.sort((a,b) => a.title.localeCompare(b.title)) 

		setTags(newTags)
	}, [menuStore.tag])	

	return tags
}

export const useEditFormFood:UseEditFormFood = (data:I.Food) => {
	const [showToast] = useToast()
	
	if (data===undefined) data = editFormStore.emptyFood

	//эта жуть конвертирует строку в специальный формат для редактора
	let [editorState, setEditorState] = useState<EditorState>(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(data.info).contentBlocks)))

	const handleInputChange = (field: string, value: string) => {
		switch (field) {
			case 'name':
				editFormStore.setData({...state.data, name:value}); 
				break;
			case 'price':
				editFormStore.setData({...state.data, price:Number(value)}); break;        
			case 'section':
				editFormStore.setData({...state.data, section:value}); break;        
			case 'hidden':
				editFormStore.setData({...state.data, hidden:(value === 'true')}); break;        
			case 'tag':
				const finded = state.data.tags.find(id => id === value)
				const newTags = (finded === undefined) ?
					[...state.data.tags, value]
					:
					state.data.tags.filter(t => t !== value)
				editFormStore.setData({...state.data, tags:newTags})
				break;        
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
					editFormStore.setData({...fd, images:newImages, version: fd.version + 1})
				}
			})
		}

		if (editFormStore.imagesToDelete.length>0) {
			await deleteImagesApi(editFormStore.imagesToDelete, id)
		}     

		await uploadFoodApi(editFormStore.formData, id)
		.then(result => {
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