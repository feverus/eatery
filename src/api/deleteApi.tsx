import urlApi  from './urlApi';

const deleteApi = async (id:string, endPoint:string): Promise<boolean|string> => {
	try {
		const response = await fetch(urlApi+"/"+endPoint+"/"+id, {method: 'DELETE'});
		if (response.status===200) {
			return true;
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

export default deleteApi;