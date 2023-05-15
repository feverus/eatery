import { useState, useEffect } from 'react'
import setStore from '~Store/setStore'
import menuStore from '~Store/menuStore'
import * as I from '~Store/storeInterfaces'
import { UseBasketList, BasketListItem } from "./basketList.props"
import { useDbBasket } from '~/db'

const useBasketList:UseBasketList = () => {
    const [dbStateBasket, dbApiBasket] = useDbBasket()

    const [basketItems, setBasketItems] = useState<BasketListItem[]>([])
    const [orderItems, setOrderItems] = useState<BasketListItem[]>([])

    useEffect(() => {
        setStore.setPage('Управление заказом')
    }, [])
    
    useEffect(() => {
        if (dbStateBasket.basket!== undefined) {
            let temp:BasketListItem[] = []
            dbStateBasket.basket.forEach((item) => {
                const food = menuStore.food.find(food => food.id === item.id)
                if (food!==undefined)
                temp.push({
                    id: item.id,
                    name: food.name,
                    price: food.price,
                    oldPrice: food.price,
                    count: item.count,
                    status: 0,
                    version: 0
                })
            })
            setBasketItems(temp)
        }      
    
    }, [dbStateBasket.total])

    useEffect(() => {
        if (setStore.order.length > 0) {            
            let temp:BasketListItem[] = []
            setStore.order.forEach(item => {
                const finded = temp.findIndex(t => t.id === item.foodid && t.price === item.price && t.status === item.status)
                const food = menuStore.food.find(food => food.id === item.foodid)

                if (finded !== -1) {
                    temp[finded].count = temp[finded].count + 1
                } else {
                    if (food!==undefined)
                        temp.push({
                            id: item.foodid,
                            name: food.name,
                            price: item.price,
                            oldPrice: (item.price === food.price) ? item.price : food.price,
                            count: 1,
                            status: item.status,
                            version: 0
                        })            
                }
            })
            temp.sort((a, b) => a.status - b.status)
            setOrderItems(temp)
        }          
    }, [setStore.order])
    

    const state = {
        basketItems,
        orderItems,
    }
    const api = {
    }
    
    return (
        [state, api]
    )
}

export default useBasketList