import { useState, useEffect } from 'react'

import * as I from '../../store/storeInterfaces'
import menuStore from '../../store/menuStore'
import setStore from "../../store/setStore"
import editFormStore from "../../store/editFormStore"
import {getFoodApi} from '../../api/getApi'
import useToast from '../toast'
import { UseFoodCard } from './foodCard.props'

const useFoodCard:UseFoodCard = () => {
    const [count, setCount] = useState(0)

    const add = () => {
        setCount(count+1)
    }
    const remove = () => {
        if (count>0) setCount(count-1)
    }
    const openEditForm = (item:I.Food) => {
        editFormStore.openForm('food', item)
    }

    const state = {
        count,
    }
    const api = {
        add,
        remove,
        openEditForm
    }
    
    return (
        [state,api]
    )
}

export default useFoodCard