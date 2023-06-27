import ky from './_ky'
import * as I from '~Store/storeInterfaces'
import urlApi  from './urlApi'
import { ImageListType } from 'react-images-uploading'
import { converterDataURItoBlob } from './converterDataURItoBlob'
import setStore from "~Store/setStore"

export async function uploadFoodApi (data:any, id: string): Promise<I.Food|string> {
	const url = (id==="")?
		urlApi + "food":
		urlApi + "food/" +id

	try {	
		let answer:any
		if (id==="") answer = await ky.post(url, { json: {...data, id: ""} });
		else answer = await ky.put(url, { json: {...data, id: ""}, method:"PUT"})
		const json = await answer.json()
		return json
	} catch (error) {
		return (error as Error).message
	}
}

export function uploadAllFoodApi (foods: I.Food[], ids:string[]): string {
	let result = 'Success'
	setStore.setDisabledInteractions(true)

	Promise.all(foods.map(item => ids.includes(item.id) && uploadFoodApi(item, item.id)))
	.then()
	.catch((error) => {
		result = error.message
	})
	.finally(() => setStore.setDisabledInteractions(false))
	return result
}

export async function uploadSectionApi (data:any, id: string): Promise<I.Section|string> {
	const url = (id==="")?
		urlApi + "section":
		urlApi + "section/" +id

	try {	
		let answer:any
		if (id==="") answer = await ky.post(url, { json: {...data, id: ""} });
		else answer = await ky.put(url, { json: {...data, id: ""}, method:"PUT"})
		const json = await answer.json()
		return json
	} catch (error) {
		return (error as Error).message
	}
}

export function uploadAllSectionApi (sections: I.Section[], ids:string[]): string {
	let result = 'Success'
	setStore.setDisabledInteractions(true)

	Promise.all(sections.map(item => ids.includes(item.id) && uploadSectionApi(item, item.id)))
	.then()
	.catch((error) => {
		result = error.message
	})
	.finally(() => setStore.setDisabledInteractions(false))
	return result
}

export async function uploadTagApi (data:any, id: string): Promise<I.Tag|string> {
	const url = (id==="")?
		urlApi + "tag":
		urlApi + "tag/" +id

	try {	
		let answer:any
		if (id==="") answer = await ky.post(url, { json: {...data, id: ""} });
		else answer = await ky.put(url, { json: {...data, id: ""}, method:"PUT"})
		const json = await answer.json()
		return json
	} catch (error) {
		return (error as Error).message
	}
}

export async function uploadImageApi (data:ImageListType, id: string): Promise<Array<string>|string > {
	const url = urlApi + "_images/" +id
	const formData = new FormData()
	let tempBlob:Blob|undefined
	data.forEach(({ dataURL, file }, index) => {
		if (dataURL!==undefined) {
			tempBlob = converterDataURItoBlob(dataURL)
			if (tempBlob!==undefined) formData.append(index.toString(), tempBlob, Date.now().toString() + '_' + index.toString() + '_' + file?.name)
		}
	})
	try {	
		let answer:any
		answer = await ky.post(url, {body: formData})
		let json = await answer.json()		
		json.forEach((element:string, num:number) => {
			json[num] = urlApi + element
		})
		return json
	} catch (error) {
		return (error as Error).message
	}
}