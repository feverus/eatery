import ky from 'ky'
import * as I from '../store/storeInterfaces'
import urlApi  from './urlApi'

export async function loginWithTokenApi (token: string): Promise<string> {
	try {	
		let answer:any
		answer = await ky.post(urlApi+"_logins", { json: {"token":token} })
		const result = await answer.text()
		return result
	} catch (error) {
		return (error as Error).message
	}
}