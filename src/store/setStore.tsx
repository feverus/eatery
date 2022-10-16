import {makeAutoObservable, observable, action, autorun} from 'mobx';

import * as I from './storeInterfaces';

export class SetStore {
    page:string = 'login'

    constructor() {
        makeAutoObservable(this, {
            page: observable,
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