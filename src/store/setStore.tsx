import {makeAutoObservable, observable, action, computed} from 'mobx'
import * as I from './storeInterfaces'

export class SetStore {
    page:string = 'Меню'
    role:string = ''
    name:string = ''
    token:string = ''
    disabledInteractions: boolean = true
    order:I.OrderDataItem[] = []
    mobileView: boolean = false

    constructor() {
        makeAutoObservable(this, {
            page: observable,
            role: observable,
            token: observable,
            mobileView: observable,
            orderTotal: computed,
            orderStatus: computed,
            setRole: action,
            setPage: action,
            setToken: action,
            setOrder: action,
            setMobileView: action,
        })
        this.order = observable.array(
            this.order, {deep:true}
        )
    }

    get orderTotal() {
        return this.order.reduce((total, food) => total + food.price, 0)
    }

    get orderStatus() {
        if (this.order.length === 0) return 0
        if (this.order.every((food) => food.status === 0)) return 0
        if (this.order.every((food) => food.status === 2)) return 2
        if (this.order.some((food) => food.status === 4)) return 4
        return 1
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
    setDisabledInteractions(mode:boolean) {
        this.disabledInteractions = mode
    }
    setOrder(newOrder:I.OrderDataItem[]) {
        this.order = newOrder
    }
    setMobileView(newView:boolean) {
        this.mobileView = newView
    }
}

const setStore = new SetStore()
export default setStore