import {makeAutoObservable, observable, action, autorun} from 'mobx';

import * as I from './storeInterfaces';

export class FoodStore {
    menu:Array<I.Food> = []

    constructor(initState:Array<I.Food>) {
        this.menu = initState
        makeAutoObservable(this, {
            menu: observable,
            addFood: action
        })
        autorun(() => console.log('food store autorun'));
    }
    
    addFood(newFood:I.Food) {
        this.menu.push(newFood)
    }
}

const initState = [{"id":"57687","name":"\u041f\u0438\u0446\u0430 \u0441 \u0430\u043d\u0430\u043d\u0430\u0441\u0430\u043c\u0438","section":"57571","price":300,"images":["https:\/\/reservationsteps.ru\/files\/88\/05\/8805d5006779ae0999a6bde021020d8e_1050x600.jpg","https:\/\/reservationsteps.ru\/files\/97\/d9\/97d9a0a8a35332c82009e8b36af6d874_1050x600.jpg"],"info":"<ul><li>\u0442\u0435\u0441\u0442\u043e<\/li><li>\u0430\u043d\u0430\u043d\u0430\u0441\u044b<\/li><li>\u043c\u044f\u0441\u043e<\/li><\/ul>"}]

const foodStore = new FoodStore(initState)
export default foodStore