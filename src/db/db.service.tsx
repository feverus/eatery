import * as I from '~Store/storeInterfaces'
import { UseDb } from './db.props'
import { dbMenu } from './DbMenu'
import { dbBasket } from './DbBasket'
import { useLiveQuery } from 'dexie-react-hooks'

export const useDb:UseDb = () => {     
    const basket = useLiveQuery(() => {return dbBasket.basket.toArray()})
    const food = useLiveQuery(() => {return dbMenu.food.toArray()})
    const section = useLiveQuery(() => {return dbMenu.section.toArray()})
    const tag = useLiveQuery(() => {return dbMenu.tag.toArray()})
    const versions = useLiveQuery(() => {return dbMenu.versions.toArray()})

    const findInBasketById = (id: string) => {
        return basket?.find(item => item.id === id)
    }

    const createBasketItem = (id: string) => {
        dbBasket.basket.add({
            id: id, count: 1
        })
    }

    const deleteBasketItem = (id: string) => {
        dbBasket.basket
            .where({id: id})
            .delete()   
    }

    const incBasketItem = (id: string) => {
        const finded = findInBasketById(id)
        if (finded) 
            dbBasket.basket
                .where({id: id})
                .modify({id: id, count: finded.count + 1})
        else
            createBasketItem(id)
    }

    const decBasketItem = (id: string) => {
        const finded = findInBasketById(id)
        if (finded) 
            if (finded.count === 1) 
                deleteBasketItem(id)
            else
                dbBasket.basket
                    .where({id: id})
                    .modify({id: id, count: finded.count - 1})
    }


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
        basket: basket,
        food: food,
        section: section,
        tag: tag,
        versions: versions,
    }
    
    const api = {
        findInBasketById: findInBasketById,
        createBasketItem: createBasketItem,
        incBasketItem: incBasketItem,
        decBasketItem: decBasketItem,
        deleteBasketItem: deleteBasketItem,
        putItems: putItems,
    }

    return (
        [state, api]
    )
}