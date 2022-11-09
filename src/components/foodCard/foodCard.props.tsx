import * as I from '../../store/storeInterfaces';

export type ControlCallback = () => void;

export type UseFoodCard = (item: I.Food) => [
    state: {
        count: number;
    },
    api: {
        add: ControlCallback;
        remove: ControlCallback;
        openEditForm: (item: I.Food) => void;
    }
];