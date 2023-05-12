import * as I from '~Store/storeInterfaces';

export type UseFoodCard = (id: string) => [
    state: {
        count: number;
    },
    api: {
        add: I.ControlCallback;
        remove: I.ControlCallback;
        removeAll: I.ControlCallback;
        clear: I.ControlCallback;
        openEditForm: I.ControlCallback;        
        handleDelete: I.ControlCallback;
    }
];