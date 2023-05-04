export type StateType = {
    displayedPage: JSX.Element,
    loginButtonText: string,     
    showAskNameDialog: boolean,
};

export type ApiType = {
    go: (name:string) => void,
};

export type UseMain = () => [
    state: StateType,
    api: ApiType
];