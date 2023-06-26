import {observer} from "mobx-react"

import editFormStore from "~Store/editFormStore"
import { EditFormFood, EditFormSection, EditFormTag } from "./"

function EditForm() {
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

export default (observer(EditForm))