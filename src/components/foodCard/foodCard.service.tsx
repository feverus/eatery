import { useState } from 'react'

import * as I from '~Store/storeInterfaces'
import menuStore from '~Store/menuStore'
import editFormStore from "~Store/editFormStore"
import { deleteApi } from "~Api/deleteApi"
import { UseFoodCard } from './foodCard.props'
import { useDbBasket } from '~/db'

const useFoodCard:UseFoodCard = (item:I.Food) => {
    const [dbState, dbApi] = useDbBasket()
    const itemInBasket = dbApi.findInBasketById(item.id)
    const count = (itemInBasket===undefined) ? 0 : itemInBasket.count

    const add = () => {
        dbApi.incBasketItem(item.id)
    }
    const remove = () => {
        if (count > 0)
            dbApi.decBasketItem(item.id)
    }
    const openEditForm = () => {
        editFormStore.openForm('food', item)
    }

    const handleDelete = () => {
        deleteApi(item.id, 'food')
        menuStore.removeFood(item.id)
    }

    const state = {
        count,
    }
    const api = {
        add,
        remove,
        openEditForm,
        handleDelete,
    }
    
    return (
        [state,api]
    )
}

export default useFoodCard