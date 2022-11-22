import {makeAutoObservable, observable, action, autorun} from 'mobx';

export class SetStore {
    page:string = 'Login Screen'
    role:string = ''

    constructor() {
        makeAutoObservable(this, {
            page: observable,
            role: observable,
            setRole: action,
            setPage: action,
        })
        autorun(() => console.log('set store autorun'));
    }
    
    setRole(newRole:string) {
        this.role = newRole
    }
    setPage(newPage:string) {
        this.page = newPage
    }
}

const setStore = new SetStore()
export default setStore