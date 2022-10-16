import { useState, useEffect } from 'react'

import * as I from '../../store/storeInterfaces'
import menuStore from '../../store/menuStore'
import setStore from "../../store/setStore"
import getFoodApi from '../../api/getApi'

type UseFood = (
            ) => [
                state: {
                    filteredfood:Array<I.Food>
                },
            ]
const useFood = () => {
    const [filteredFood, setFood] = useState<Array<I.Food>>([])

    useEffect(() => {
        getFoodApi()
        .then(result => {
            if (typeof result!=='string') {                
                menuStore.loadFoodBase(result)
                setFood(result)
            } else {
                console.log('ошибка загрузки еды')
                console.log({status:result});
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