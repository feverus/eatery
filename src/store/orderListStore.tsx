import {makeAutoObservable, observable, action, computed} from 'mobx'
import * as I from './storeInterfaces'

export class OrderListStore {
	orders: I.OrderData[] = []

	constructor() {
		makeAutoObservable(this, {
			setOrders: action,
		})
		this.orders = observable.array(
			this.orders, {deep:true}
		)
	}

	setOrders(newOrders:I.OrderData[]) {
		this.orders = newOrders
	}

}

const orderListStore = new OrderListStore()
export default orderListStore