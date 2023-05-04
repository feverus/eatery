import { useState, useEffect } from 'react'

import * as I from '~Store/storeInterfaces'
import menuStore from '~Store/menuStore'
import editFormStore from '~Store/editFormStore'
import { FoodList } from "./foodList.props"

const useFoodList:FoodList = () => {
    const [filteredFood, setFiltereFood] = useState<Array<I.Food>>(menuStore.food)
    const [sectionedFood, setSectionedFood] = useState<Array<I.Food|string>>([])

    useEffect(() => {
        if (menuStore.food.length>0) {
            let tempSection:Array<I.Food>|undefined
            let tempFull:Array<I.Food|string> = ['']
            let noSectionFinded = false

            menuStore.section.forEach(
                (item, id) => {
                    tempSection = menuStore.food.filter((el)=>
                        el.section==item.id)
                    tempFull.push(item.name)
                    tempFull = tempFull.concat(tempSection)
                }
            )
           
            menuStore.food.forEach(
                (item) => {
                    if (menuStore.section.find(el => el.id==item.section)===undefined) {
                        if (noSectionFinded === false) {
                            noSectionFinded = true
                            tempFull.push('Без категории')
                        }
                        tempFull.push(item)
                    }
                }
            )                
    
            if (tempFull.length>0) tempFull.shift()
            setFiltereFood(menuStore.food)
            setSectionedFood(tempFull)
        }
    }, [menuStore.food, menuStore.tag, menuStore.section])
    
    const openEditForm = () => {
        editFormStore.openForm('food', undefined)
    }
    
    //хук возвращает отфильтрованное меню

    const state = {
        filteredFood,
        sectionedFood
    }
    const api = {
        openEditForm,
    }
    
    return (
        [state, api]
    )
}

export default useFoodList