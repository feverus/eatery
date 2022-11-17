import {makeAutoObservable, observable, action, autorun} from 'mobx';

import * as I from './storeInterfaces';

export class MenuStore {
    food:Array<I.Food> = []
    section:Array<I.Section> = []
    tag:Array<I.Tag> = [];

    constructor() {
        makeAutoObservable(this, {
            food: observable,
            section: observable,
            tag: observable,
            addFood: action,
            editFood: action,
            removeFood: action,
        })
        autorun(() => console.log('menu store autorun'));
    }
    
    //загрузка полных баз
    loadFoodBase(newFoodBase:Array<I.Food>) {
        this.food = newFoodBase
    }    
    loadSectionBase(newSectionBase:Array<I.Section>) {
        this.section = newSectionBase
    }
    loadTagBase(newTagBase:Array<I.Tag>) {
        this.tag = newTagBase
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
            if (element.id==id) {
                if (editedFood===undefined) copy.splice(num, 1)
                else copy.splice(num, 1, editedFood)
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