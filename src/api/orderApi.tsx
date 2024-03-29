import ky from './_ky'
import * as I from '~Store/storeInterfaces'
import urlApi  from './urlApi'

/** конвертирует несколько массивов с данными (id товаров, стоимость, статусы) в один массив объектов */
const convertRawToStore = (json:I.OrderFromApi):I.OrderData => {
	let result:I.OrderData = {id: json.id, name: json.name, version: json.version, food: []}
	if (json.foodid!==undefined) {
		json.foodid.forEach((id, n) => {
			result.food.push({
				"foodid": json.foodid[n],
				"price": json.price[n],
				"status": json.status[n],
				"time": json.time[n],
			})
		})
	}
	return result
}

/** разделяет массив объектов на несколько массивов по полям */
const convertStoreToRaw = (json:I.OrderData):I.OrderToApi => {
	let result:I.OrderToApi = {id: json.id, version: json.version, foodid: [], price: [], status: []}
	json.food.forEach(food => {
		result.foodid.push(food.foodid)
		result.price.push(food.price)
		result.status.push(1)
	})
	return result
}

export const getAllOrdersApi = async (): Promise<I.OrderData[]|string> => {
	try {
		const jsonArray:I.OrderFromApi[] = await ky.get(urlApi+"order").json()
		return jsonArray.map(json => convertRawToStore(json))
	} catch (error) {
		return (error as Error).message
	}
}

export const getOrderApi = async (id: string): Promise<I.OrderData|string> => {
	try {
		const json:I.OrderFromApi = await ky.get(urlApi+"order/" + id).json()
		return convertRawToStore(json)
	} catch (error) {
		return (error as Error).message
	}
}

export const createOrderApi = async (name: string): Promise<I.OrderData|string> => {
	try {
		const json:I.OrderFromApi = await ky.post(urlApi+"order", { json: {name: name} }).json()
		return convertRawToStore(json)
	} catch (error) {
		return (error as Error).message
	}
}

export const addToOrderApi = async (order:I.OrderData): Promise<I.OrderData|string> => {
	try {
		const readyJson = convertStoreToRaw(order)
		const json:I.OrderFromApi = await ky.put(urlApi+"order/" + order.id, { json: readyJson }).json()

		return convertRawToStore(json)
	} catch (error) {
        return (error as Error).message
    }
}

