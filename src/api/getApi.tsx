import * as I from '../store/storeInterfaces';
import urlApi  from './urlApi';

const getFoodApi = async (): Promise<Array<I.Food>|string> => {
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

export default getFoodApi;