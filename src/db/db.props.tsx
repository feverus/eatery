import * as I from '~Store/storeInterfaces'

export type OrderItem = {
    id: string;
    count: number;
}

export type ApiType = {
    createBasketItem: (id: string) => void;
    incBasketItem: (id: string) => void;
    decBasketItem: (id: string) => void;
    deleteBasketItem: (id: string) => void;
    putItems: (base: string, items: I.SomeDataFromApi) => void;
    findInBasketById: (id: string) => OrderItem | undefined;

};

export type StateType = {
    basket: OrderItem[] | undefined,
    food: I.Food[] | undefined,
    tag: I.Tag[] | undefined,
    section: I.Section[] | undefined,
    versions: I.VersionsItem[] | undefined,
} 

export type UseDb = () => [
    state: StateType,
    api: ApiType
];