import * as I from '../../store/storeInterfaces';

export type UseFoodCard = (item: I.Food) => [
    state: {
        count: number;
    },
    api: {
        add: I.ControlCallback;
        remove: I.ControlCallback;
        openEditForm: (item: I.Food) => void;        
        handleDelete: (id: string) => void;
    }
];