import * as I from '../../store/storeInterfaces';

export type FoodList = () => [
    state: {
        filteredFood:Array<I.Food>,
        sectionedFood:Array<I.Food|string>,
    },
    api: {
        openEditForm: I.ControlCallback
    }
];