import ky from 'ky'
import urlApi  from './urlApi';

export async function deleteApi (id:string, endPoint:string): Promise<boolean|string> {
	try {
		const answer:any = await ky.delete(urlApi+"/"+endPoint+"/"+id)
		const json = await answer.json()
		return json
	} catch (error) {
        return (error as Error).message
    }
}