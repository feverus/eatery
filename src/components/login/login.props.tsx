import * as I from '../../store/storeInterfaces';

export type StateType = {
    inputLogin: string,
    inputPassword: string,
};

export type ApiType = {
    login: I.ControlCallback,
    logout: I.ControlCallback,
    setInputLogin: (value:string) => void,
    setInputPassword: (value:string) => void,
};

export type UseLogin = () => [
    state: StateType,
    api: ApiType
];