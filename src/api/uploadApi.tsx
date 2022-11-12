import ky from 'ky';
import * as I from '../store/storeInterfaces';
import urlApi  from './urlApi';
import { ImageListType, ImageType } from 'react-images-uploading';

export async function uploadFoodApi (data:any, id: string): Promise<I.Food|string> {
	const url = (id==="")?
		urlApi + "food":
		urlApi + "food/" +id

	try {	
		let answer:any
		if (id==="") answer = await ky.post(url, { json: {...data, id: ""} });
		else answer = await ky.put(url, { json: {...data, id: ""}, method:"PUT" })
		const json = await answer.json()
		return json
	} catch (error) {
		return (error as Error).message
	}
}

function dataURItoBlob(dataURI:string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

export async function uploadImageApi (data:ImageListType, id: string): Promise<I.Food|string> {

	const url = urlApi + "_images/" +id
	const formData = new FormData();
	data.forEach(({ dataURL, file }, index) => {
		formData.append(index.toString(), dataURItoBlob(dataURL as string))
	})
	
	console.log(url)
	console.log(formData)
	try {	
		let answer:any
		if (id==="") answer = await ky.post(url, {body: formData})
		console.log(answer)
		const json = await answer.json()
		console.log(json)
		return json
	} catch (error) {
		return (error as Error).message
	}
}