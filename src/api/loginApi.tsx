import ky from './_ky'
import * as I from '~Store/storeInterfaces'
import urlApi  from './urlApi'

export async function loginWithTokenApi (token: string): Promise<I.AuthData | I.AuthDataWithError> {
	try {	
		let answer:any
		answer = await ky.post(urlApi+"_logins",
				{ json: {"token": token} }
		)
		const result = await answer.text()
		return JSON.parse(result)
	} catch (error) {
		return {
			'error': (error as Error).message, 
			'result': await (error as any).response.json()
		}
	}
}

export async function loginWithPasswordApi (login: string, password: string): Promise<I.AuthData | string> {
	try {	
		let answer:any
		answer = await ky.post(urlApi+"_logins",
				{ json: {"login": login, "password": password} }
		)
		const result = await answer.text()
		return JSON.parse(result)
	} catch (error) {
		return (error as Error).message
	}
}
