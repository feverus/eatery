import ky from 'ky';

import * as I from '../store/storeInterfaces';
import urlApi  from './urlApi';

export const getFoodApi = async (): Promise<Array<I.Food>|string> => {
	try {
		const json:Array<I.Food> = await ky.get(urlApi+"food").json()
		return json
	} catch (error) {
        return (error as Error).message
    }
}

export const getSectionApi = async (): Promise<Array<I.Section>|string> => {
	try {
		const json:Array<I.Section> = await ky.get(urlApi+"section").json()
		return json
	} catch (error) {
        return (error as Error).message
    }
}

export const getTagApi = async (): Promise<Array<I.Tag>|string> => {
	try {
		const json:Array<I.Tag> = await ky.get(urlApi+"tag").json()
		return json
	} catch (error) {
        return (error as Error).message
    }
}
