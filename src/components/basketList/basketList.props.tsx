import * as I from '~Store/storeInterfaces'

export type BasketListItem = I.ItemWithId & {
    price: number,
    oldPrice?: number,
    count: number,
    status: number,
}

export type UseBasketList = () => [
    state: {
        basketItems: BasketListItem[],
    },
    api: {
    }
];