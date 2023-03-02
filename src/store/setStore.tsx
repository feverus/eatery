import {makeAutoObservable, observable, action, autorun} from 'mobx';

export class SetStore {
    page:string = 'Меню'
    role:string = ''
    token:string = ''

    constructor() {
        makeAutoObservable(this, {
            page: observable,
            role: observable,
            token: observable,
            setRole: action,
            setPage: action,
            setToken: action,
        })
        autorun(() => console.log('set store autorun'));
    }
    
    setRole(newRole:string) {
        this.role = newRole
    }
    setPage(newPage:string) {
        this.page = newPage
    }
    setToken(newToken:string) {
        this.token = newToken
    }
}

const setStore = new SetStore()
export default setStore