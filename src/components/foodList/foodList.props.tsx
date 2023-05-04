import * as I from '~Store/storeInterfaces';

export type FoodList = () => [
    state: {
        filteredFood:Array<I.Food>,
        sectionedFood:Array<I.Food|string>,
    },
    api: {
        openEditForm: I.ControlCallback
    }
];