import * as I from '~Store/storeInterfaces'

import Dexie, { Table } from 'dexie'

export class DbMenu extends Dexie {
    tag!: Table<I.Tag>;
    food!: Table<I.Food>;
    section!: Table<I.Section>;
    versions!: Table<I.VersionsItem>

    constructor() {
        super('DbMenu')
        this.version(1).stores({
            tag: 'id, name',
            food: 'id, name, section, price, images, info',
            section: 'id, name, order',
            versions: 'name, version'
        })
    }
}

export const dbMenu = new DbMenu();