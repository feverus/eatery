import * as I from '../store/storeInterfaces';
import urlApi  from './urlApi';

export const getFoodApi = async (): Promise<Array<I.Food>|string> => {
	try {
		const response = await fetch(urlApi+"/food", {method: 'GET'});
		if (response.status===200) {
			const data = await response.json();
			return data;
		} else {
			return String(response.status);
		}
	} catch (error) {
        if (error) {
            return (error as Error).message;
        }
    }
	return "";
}

export const getSectionApi = async (): Promise<Array<I.Section>|string> => {
	try {
		const response = await fetch(urlApi+"/section", {method: 'GET'});
		if (response.status===200) {
			const data = await response.json();
			return data;
		} else {
			return String(response.status);
		}
	} catch (error) {
        if (error) {
            return (error as Error).message;
        }
    }
	return "";
}

export const getTagApi = async (): Promise<Array<I.Tag>|string> => {
	try {
		const response = await fetch(urlApi+"/tag", {method: 'GET'});
		if (response.status===200) {
			const data = await response.json();
			return data;
		} else {
			return String(response.status);
		}
	} catch (error) {
        if (error) {
            return (error as Error).message;
        }
    }
	return "";
}
