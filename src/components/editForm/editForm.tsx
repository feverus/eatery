import editFormStore from "~Store/editFormStore"
import EditFormFood from "./components/editFormFood"
import EditFormSection from "./components/editFormSection"
import EditFormTag from "./components/editFormTag"

export function EditForm() {
    if (editFormStore.open===true) {
        switch (editFormStore.type) {
            case 'food':
                return (<EditFormFood />); break;
            case 'section':
                return (<EditFormSection />); break;
            case 'tag':
                return (<EditFormTag />); break;
            default:
                return (<EditFormFood />); break;
        }
    }
    else {
        return <></>
    }
}