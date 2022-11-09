import ky from 'ky';
import * as I from '../store/storeInterfaces';
import urlApi  from './urlApi';

export async function uploadFoodApi (data:any, id: string): Promise<I.Food|string> {
	const url = (id==="")?
		urlApi + "food":
		urlApi + "food/" +id
	//не передаем id в json, он назначается автоматически 
	data.id = ""

	try {	
		let answer:any
		if (id==="") answer = await ky.post(url, { json: data });
		else answer = await ky.post(url, { json: data, method: "PUT" })
		const json = await answer.json()
		return json
	} catch (error) {
		return (error as Error).message
	}
}