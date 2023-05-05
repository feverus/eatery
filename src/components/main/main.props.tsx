export type StateType = {
    displayedPage: JSX.Element,
    loginButtonText: string,     
    showAskNameDialog: boolean,
    orderStatus: string,
    basketStatus: string,
};

export type ApiType = {
    go: (name:string) => void,
};

export type UseMain = () => [
    state: StateType,
    api: ApiType
];