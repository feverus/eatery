import * as I from '../../store/storeInterfaces';

export type StateType = {
    displayedPage: JSX.Element,
    loginButtonText: string, 
};

export type ApiType = {
    
};

export type UseMain = () => [
    state: StateType,
    api: ApiType
];