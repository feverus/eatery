import * as I from '~Store/storeInterfaces'

export type OrderItem = {
    id: string;
    count: number;
}

export type ApiTypeMenu = {
    putItems: (base: string, items: I.SomeDataFromApi) => void;
};

export type StateTypeMenu = {
    food: I.Food[] | undefined,
    tag: I.Tag[] | undefined,
    section: I.Section[] | undefined,
    versions: I.VersionsItem[] | undefined,
} 

export type UseDbMenu = () => [
    state: StateTypeMenu,
    api: ApiTypeMenu
];


export type ApiTypeBasket = {
    createBasketItem: (id: string) => void;
    incBasketItem: (id: string) => void;
    decBasketItem: (id: string) => void;
    deleteBasketItem: (id: string) => void;
    findInBasketById: (id: string) => OrderItem | undefined;
};

export type StateTypeBasket = {
    basket: OrderItem[] | undefined,
    total: number,
    count: number,
} 

export type UseDbBasket = () => [
    state: StateTypeBasket,
    api: ApiTypeBasket
];