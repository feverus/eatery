import {observer, inject} from "mobx-react";
import EditFormFood from "./editFormFood";
import editFormStore from "../../store/editFormStore"

const EditForm = () => {
    if (editFormStore.open===true) {
        switch (editFormStore.type) {
            case 'food':
                return (<EditFormFood />); break;
            default:
                return (<EditFormFood />); break;
        }
    }
    else {
        return <></>
    }
}


export default
	inject('editFormStore')
	(observer(EditForm));