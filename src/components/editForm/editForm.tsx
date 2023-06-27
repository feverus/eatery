import {observer} from "mobx-react"

import editFormStore from "~Store/editFormStore"
import { EditFormFood, EditFormSection, EditFormTag } from "./"

function EditForm() {
    if (editFormStore.open === true) {
        switch (editFormStore.type) {
            case 'food':
                return (<EditFormFood />);
            case 'section':
                return (<EditFormSection />);
            case 'tag':
                return (<EditFormTag />);
            default:
                return (<EditFormFood />);
        }
    }
    else {
        return <></>
    }
}

export default (observer(EditForm))