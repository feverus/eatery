import {makeAutoObservable, observable, action} from 'mobx'
import * as I from './storeInterfaces'

export class MenuStore {
	tag:Array<I.Tag> = [];
	food:Array<I.Food> = []
	section:Array<I.Section> = []

	constructor() {
		makeAutoObservable(this, {
			tag: observable,
			food: observable,
			addFood: action,
			editFood: action,
			removeFood: action,
		})
		this.section = observable.array(
			this.section, {deep:true}
		)
	}
	
	//загрузка полных баз
	loadFoodBase(newFoodBase:Array<I.Food>) {
		if (newFoodBase.length > 0) this.food = newFoodBase
	}    
	loadSectionBase(newSectionBase:Array<I.Section>) {
		if (newSectionBase.length > 0)
			this.section = JSON.parse(JSON.stringify(newSectionBase.sort((a,b) => a.position - b.position)))
	}
	loadTagBase(newTagBase:Array<I.Tag>) {
		if (newTagBase.length > 0) this.tag = newTagBase
	}

	//еда
	addFood(newFood:I.Food) {
		let copy = JSON.parse(JSON.stringify(this.food));
		copy.push(newFood)
		this.food = copy
	}
	
	editFood(id:string, editedFood:I.Food|undefined) {
		let copy = JSON.parse(JSON.stringify(this.food))

		copy.forEach((element: { id: string; }, num: any) => {
			if (element.id === id) {
				if (editedFood === undefined)
					copy.splice(num, 1)
				else
					copy.splice(num, 1, editedFood)
			}
		})
		this.food = copy
	}

	removeFood(id:string) {
		this.editFood(id, undefined)
	}

	//категории
	addSection(newSection:I.Section) {
		let copy = JSON.parse(JSON.stringify(this.section));
		copy.push(newSection)
		this.section = copy
	}
	
	editSection(id:string, editedSection:I.Section|undefined) {
		let copy = JSON.parse(JSON.stringify(this.section))

		copy.forEach((element: { id: string; }, num: any) => {
			if (element.id === id) {
				if (editedSection === undefined)
					copy.splice(num, 1)
				else
					copy.splice(num, 1, editedSection)
			}
		})
		this.section = copy
	}

	removeSection(id:string) {
		this.editSection(id, undefined)
	}


	//тэги
	addTag(newTag:I.Tag) {
		let copy = JSON.parse(JSON.stringify(this.tag));
		copy.push(newTag)
		this.tag = copy
	}
	
	editTag(id:string, editedTag:I.Tag|undefined) {
		let copy = JSON.parse(JSON.stringify(this.tag))

		copy.forEach((element: { id: string; }, num: any) => {
			if (element.id === id) {
				if (editedTag === undefined)
					copy.splice(num, 1)
				else
					copy.splice(num, 1, editedTag)
			}
		})
		this.tag = copy
	}

	removeTag(id:string) {
		this.editTag(id, undefined)
	}


}

const menuStore = new MenuStore()
export default menuStore