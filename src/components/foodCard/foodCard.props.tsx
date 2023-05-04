import * as I from '~Store/storeInterfaces';

export type UseFoodCard = (item: I.Food) => [
    state: {
        count: number;
    },
    api: {
        add: I.ControlCallback;
        remove: I.ControlCallback;
        openEditForm: I.ControlCallback;        
        handleDelete: I.ControlCallback;
    }
];