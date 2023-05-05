import * as I from '~Store/storeInterfaces'
import { UseDbMenu } from './db.props'
import { dbMenu } from './DbMenu'
import { useLiveQuery } from 'dexie-react-hooks'

export const useDbMenu:UseDbMenu = () => {
    const food = useLiveQuery(() => {return dbMenu.food.toArray()})
    const section = useLiveQuery(() => {return dbMenu.section.toArray()})
    const tag = useLiveQuery(() => {return dbMenu.tag.toArray()})
    const versions = useLiveQuery(() => {return dbMenu.versions.toArray()})

    const putItems = (base: string, items: I.SomeDataFromApi) => {
        switch (base) {
            case 'food':
                dbMenu.food.clear()
                dbMenu.food.bulkAdd(items as I.Food[])
                break;
            case 'section':
                dbMenu.section.clear()
                dbMenu.section.bulkAdd(items as I.Section[])
                break;
            case 'tag':
                dbMenu.tag.clear()
                dbMenu.tag.bulkAdd(items as I.Tag[])
                break;
            case 'versions':
                dbMenu.versions.clear()
                dbMenu.versions.bulkAdd(items as I.VersionsItem[])
                break;
        }
    }
    
    const state = {
        food: food,
        section: section,
        tag: tag,
        versions: versions,
    }
    
    const api = {
        putItems: putItems,
    }

    return (
        [state, api]
    )
}