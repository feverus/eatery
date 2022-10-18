import { useState, useEffect } from 'react'

import * as I from '../../store/storeInterfaces'
import menuStore from '../../store/menuStore'
import setStore from "../../store/setStore"
import getFoodApi from '../../api/getApi'
import useToast from '../toast'

const useFood = () => {
    const [filteredFood, setFood] = useState<Array<I.Food>>([])
    const [showToast] = useToast()
    
    useEffect(() => {
        getFoodApi()
        .then(result => {
            if (typeof result!=='string') {                
                menuStore.loadFoodBase(result)
                setFood(result)
                showToast('база food обновлена');
            } else {
                showToast(result);
            }
        }) 	
    }, [])
    
    //хук возвращает отфильтрованное меню

    const state = {
        filteredFood,
    }
    
    return (
        [state,]
    )
}

export default useFood