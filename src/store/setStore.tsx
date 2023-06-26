import {makeAutoObservable, observable, action, computed} from 'mobx'
import * as I from './storeInterfaces'

export class SetStore {
	page:string = 'Меню'
	role:string = ''
	name:string = ''
	token:string = ''
	disabledInteractions: boolean = true
	mobileView: boolean = false
	
	order:I.OrderDataItem[] = []

	sortType:undefined | string = undefined
	sortDirection:boolean = false

	foodFilterActive: boolean = false
	searchPrompt: string = ''
	goodTags: string[] = []
	badTags: string[] = []

	constructor() {
		makeAutoObservable(this, {
			page: observable,
			role: observable,
			token: observable,
			mobileView: observable,
			foodFilterActive: observable,
			searchPrompt: observable,
			sortType: observable,
			sortDirection: observable,

			orderTotal: computed,
			orderStatus: computed,

			setRole: action,
			setPage: action,
			setToken: action,
			setOrder: action,
			setMobileView: action,
			setSortType: action,
			toogleSortDirection: action,
			setFoodFilterActive: action,
			setFilters: action,
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
	
	setSortType(newSortType:string) {
		if (newSortType === '') this.disableSort()
		else this.sortType = newSortType
	}
	disableSort() {
		this.sortType = undefined
	}
	toogleSortDirection() {
		this.sortDirection = !this.sortDirection
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
	setFoodFilterActive(newMode:boolean) {
		this.foodFilterActive = newMode
	}
	setFilters(type:string, value:undefined | string | string[] = undefined) {
		switch (type) {
			case 'clear':
				this.foodFilterActive = false
				this.searchPrompt = ''
				this.goodTags = []
				this.badTags = []
				break;
			case 'searchPrompt':
				this.foodFilterActive = true
				this.searchPrompt = (value as string).toLocaleLowerCase()
				break;
			case 'goodTags':
				this.foodFilterActive = true
				this.goodTags = value as string[]
				break;
			case 'badTags':
				this.foodFilterActive = true
				this.badTags = value as string[]
				break;
			default:
				break;
		}
	}
}

const setStore = new SetStore()
export default setStore