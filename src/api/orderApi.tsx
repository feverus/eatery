import ky from 'ky'
import * as I from '../store/storeInterfaces'
import urlApi  from './urlApi'

export const getOrderApi = async (id: string): Promise<I.OrderData|string> => {
	try {
		const json:I.OrderData = await ky.get(urlApi+"order/" + id).json()
		return json
	} catch (error) {
        return (error as Error).message
    }
}

export const createOrderApi = async (name: string): Promise<I.OrderData|string> => {
	try {
		const json:I.OrderData = await ky.post(urlApi+"order", { json: {name: name} }).json()
		return json
	} catch (error) {
        return (error as Error).message
    }
}