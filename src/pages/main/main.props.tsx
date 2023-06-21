export type StateType = {
    displayedPage: JSX.Element,
    showAskNameDialog: boolean,
};

export type ApiType = {
    go: (name:string) => void,
};

export type UseMain = (page: string) => [
    state: StateType,
    api: ApiType
];