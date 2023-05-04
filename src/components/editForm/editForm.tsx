import EditFormFood from "~Components/editFormFood"
import editFormStore from "~Store/editFormStore"

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