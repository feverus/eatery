import {makeAutoObservable, observable, action, autorun} from 'mobx';

import * as I from './storeInterfaces';

export class MenuStore {
    food:Array<I.Food> = []
    section:Array<string> = []

    constructor() {
        makeAutoObservable(this, {
            food: observable,
            section: observable,
            addFood: action
        })
        autorun(() => console.log('menu store autorun'));
    }
    
    loadFoodBase(newFoodBase:Array<I.Food>) {
        console.log('база food обновлена')
        this.food = newFoodBase
    }
    addFood(newFood:I.Food) {
        this.food.push(newFood)
    }
}

const menuStore = new MenuStore()
export default menuStore