import * as I from '../../store/storeInterfaces';

export type StateType = {
    showLogin: boolean;
};

export type ApiType = {
    sampleApi: () => void;
};

export type UseMain = () => [
    state: StateType,
    api: ApiType
];