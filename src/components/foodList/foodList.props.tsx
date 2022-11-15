import * as I from '../../store/storeInterfaces';

export type FoodList = (data:Array<I.Food>) => [
    state: {
        filteredFood:Array<I.Food>,
        sectionedFood:Array<I.Food|string>,
    },
];