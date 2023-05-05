import {makeAutoObservable, observable, action, computed} from 'mobx'
import * as I from './storeInterfaces'

export class SetStore {
    page:string = 'Меню'
    role:string = ''
    name:string = ''
    token:string = ''
    order:I.OrderDataItem[] = []
    orderVersion:number = 0

    constructor() {
        makeAutoObservable(this, {
            page: observable,
            role: observable,
            token: observable,
            order: observable,
            orderVersion: observable,
            orderTotal: computed,
            setRole: action,
            setPage: action,
            setToken: action,
            setOrder: action,
        })
    }

    get orderTotal() {
        return this.order.reduce((total, food) => total + food.price, 0)
    }
    
    setRole(newRole:string) {
        this.role = newRole
    }
    setName(newName:string) {
        this.name = newName
    }
    setPage(newPage:string) {
        this.page = newPage
    }
    setToken(newToken:string) {
        this.token = newToken
    }
    setOrder(newOrder:I.OrderDataItem[]) {
        this.order = newOrder
    }
}

const setStore = new SetStore()
export default setStore