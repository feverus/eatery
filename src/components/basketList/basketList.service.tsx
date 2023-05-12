import { useState, useEffect } from 'react'
import setStore from '~Store/setStore'
import menuStore from '~Store/menuStore'
import * as I from '~Store/storeInterfaces'
import { UseBasketList, BasketListItem } from "./basketList.props"
import { useDbBasket } from '~/db'

const useBasketList:UseBasketList = () => {
    const [dbState, dbApi] = useDbBasket()

    const [basketItems, setBasketItems] = useState<BasketListItem[]>([])

    useEffect(() => {
        setStore.setPage('Управление заказом')
    }, [])
    
    useEffect(() => {
        if (dbState.basket!== undefined) {
            console.log(' dbState.basket',dbState.basket)
            let temp:BasketListItem[] = []
            dbState.basket.forEach((item) => {
                const food = menuStore.food.find(food => food.id === item.id)
                if (food!==undefined)
                temp.push({
                        id: item.id,
                        name: food.name,
                        price: food.price,
                        count: item.count,
                        status: 0
                    })
            })
            setBasketItems(temp)
        }      
    
    }, [dbState.basket, setStore.order])
    

    const state = {
        basketItems,
    }
    const api = {
    }
    
    return (
        [state, api]
    )
}

export default useBasketList