import { UseDbBasket } from './db.props'
import { dbBasket } from './DbBasket'
import { useLiveQuery } from 'dexie-react-hooks'

export const useDbBasket:UseDbBasket = () => {     
    const basket = useLiveQuery(() => {return dbBasket.basket.toArray()})

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
    
    const state = {
        basket: basket,
    }
    
    const api = {
        findInBasketById: findInBasketById,
        createBasketItem: createBasketItem,
        incBasketItem: incBasketItem,
        decBasketItem: decBasketItem,
        deleteBasketItem: deleteBasketItem,
    }

    return (
        [state, api]
    )
}