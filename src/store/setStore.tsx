import {makeAutoObservable, observable, action, autorun} from 'mobx';

export class SetStore {
    page:string = 'food-list'
    role:string = 'admin'

    constructor() {
        makeAutoObservable(this, {
            page: observable,
            role: observable,
            setPage: action
        })
        autorun(() => console.log('food store autorun'));
    }
    
    setPage(newPage:string) {
        this.page = newPage
    }
}

const setStore = new SetStore()
export default setStore