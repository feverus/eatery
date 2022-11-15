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
            addFood: action
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

    
    addFood(newFood:I.Food) {
        this.food.push(newFood)
    }
    editFood(editedFood:I.Food, id:string) {
        this.food.forEach((element, num) => {
            if (element.id==id) {
                this.food.splice(num, 0, editedFood)
            }
        })
        console.log(this.food)
    }
}

const menuStore = new MenuStore()
export default menuStore