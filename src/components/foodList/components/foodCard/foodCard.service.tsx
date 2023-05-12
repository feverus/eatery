import { useState } from 'react'

import * as I from '~Store/storeInterfaces'
import menuStore from '~Store/menuStore'
import editFormStore from "~Store/editFormStore"
import { deleteApi } from "~Api/deleteApi"
import { UseFoodCard } from './foodCard.props'
import { useDbBasket } from '~/db'

export const useFoodCard:UseFoodCard = (id:string) => {
    const [dbState, dbApi] = useDbBasket()
    const itemInBasket = dbApi.findInBasketById(id)
    const count = (itemInBasket===undefined) ? 0 : itemInBasket.count

    const add = () => {
        dbApi.incBasketItem(id)
    }

    const remove = () => {
        if (count > 0)
            dbApi.decBasketItem(id)
    }

    const removeAll = () => {
        if (count > 0)
            dbApi.deleteBasketItem(id)
    }
    
    const clear = () => {
        dbApi.clearBasket()
    }

    const openEditForm = () => {
        editFormStore.openForm('food', menuStore.food.find(item => item.id ===id))
    }

    const handleDelete = () => {
        deleteApi(id, 'food')
        menuStore.removeFood(id)
    }

    const state = {
        count,
    }
    const api = {
        add,
        remove,
        removeAll,
        clear,
        openEditForm,
        handleDelete,
    }
    
    return (
        [state,api]
    )
}