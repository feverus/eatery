export type StateType = {
    orderStatus: string,
    basketStatus: string,
    loginButtonText: string,
};

export type ApiType = {
};

export type UseTopNavigation = () => [
    state: StateType,
    api: ApiType
];