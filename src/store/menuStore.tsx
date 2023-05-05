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
            section: observable,
            addFood: action,
            editFood: action,
            removeFood: action,
        })
    }
    
    //загрузка полных баз
    loadFoodBase(newFoodBase:Array<I.Food>) {
        if (newFoodBase.length > 0) this.food = newFoodBase
    }    
    loadSectionBase(newSectionBase:Array<I.Section>) {
        if (newSectionBase.length > 0) this.section = newSectionBase
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
}

const menuStore = new MenuStore()
export default menuStore