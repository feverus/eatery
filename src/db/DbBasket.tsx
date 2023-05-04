import * as I from '~Store/storeInterfaces'
import * as P from './db.props'

import Dexie, { Table } from 'dexie'

export class DbBasket extends Dexie {
    basket!: Table<P.OrderItem>;

    constructor() {
        super('DbBasket')
        this.version(1).stores({
            basket: 'id, count'
        })
    }
}

export const dbBasket = new DbBasket();