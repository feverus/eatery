import {makeAutoObservable, observable, action, autorun} from 'mobx';
import * as I from './storeInterfaces';

type Data = I.Food|undefined;

export class EditFormStore {    
    open:boolean = false
    formData:Data = undefined
    type:string = 'food'

    constructor() {
        makeAutoObservable(this, {
            open: observable,
            formData: observable,
            setData: action,
            openForm: action,
            closeForm: action,
        })
        autorun(() => console.log('food store autorun'));
    }

    setData(data:Data) {
        this.formData = data
    }
    openForm(type:string, data:Data) {
        this.type = type
        if (data!==undefined) {
            this.formData = {id: data.id,
                name: data.name,
                section: data.section,
                price: data.price,
                images: data.images,
                info: data.info,
            }
        }
        this.open = true
    }
    closeForm() {
        this.open = false
    }
}

const editFormStore = new EditFormStore()
export default editFormStore