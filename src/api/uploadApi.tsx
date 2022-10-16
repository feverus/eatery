import * as I from '../store/storeInterfaces';
import urlApi  from './urlApi';

const uploadFoodApi = async (data:I.Food, id: string): Promise<I.Food|string> => {
	let url = (id==="")?
			urlApi + "/food":
			urlApi + "/food/" +id
	let method = (id==="")?
			"POST":
			"PUT"
	//не передаем id в json, он назначается автоматически 
	data.id = ""
	try {
		const response = await fetch(
			url,
			{method: method, 
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify(data)});
		if (response.status===200) {
			const answer = await response.json();
			if (typeof answer.id === 'string') {
				return answer;
			} else {
				return "от api получены данные в неверном формате";
			}			
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

export default uploadFoodApi;