import {makeAutoObservable, observable, action, autorun} from 'mobx';
import * as I from './storeInterfaces';

type Data = I.Food|undefined;

export class EditFormStore {    
    open:boolean = false
    data:Data = undefined
    type:string = 'food'

    constructor() {
        makeAutoObservable(this, {
            open: observable,
            data: observable,
            setData: action,
            openForm: action,
            closeForm: action,
        })
        autorun(() => console.log('food store autorun'));
    }

    setData(data:Data) {
        this.data = data
    }
    openForm(type:string, data:Data) {
        this.type = type
        this.data = data
        this.open = true
    }
    closeForm() {
        this.open = false
    }
}

const editFormStore = new EditFormStore()
export default editFormStore