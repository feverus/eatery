import {makeAutoObservable, observable, action, autorun} from 'mobx';

import * as I from './storeInterfaces';

export class MenuStore {
    food:Array<I.Food> = []
    section:Array<I.Section> = []
    tag:Array<I.Tag> = []

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

}

const menuStore = new MenuStore()
export default menuStore