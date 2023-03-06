import * as I from '../store/storeInterfaces'
import * as P from './db.props'

import Dexie, { Table } from 'dexie'

export class DbMenu extends Dexie {
    food!: Table<I.Food>;
    section!: Table<I.Section>;
    tag!: Table<I.Tag>;
    versions!: Table<I.VersionsItem>

    constructor() {
        super('DbMenu')
        this.version(1).stores({
            food: 'id, name, section, price, images, info',
            section: 'id, name, order',
            tag: 'id, name',
            versions: 'name, version'
        })
    }
}

export const dbMenu = new DbMenu();