import EditFormFood from "../editFormFood";
import editFormStore from "../../store/editFormStore"

export function EditForm() {
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