import { useState, useEffect } from 'react'

import * as I from '../../store/storeInterfaces'
import menuStore from '../../store/menuStore'
import setStore from "../../store/setStore"
import {getFoodApi, getSectionApi, getTagApi}  from '../../api/getApi'
import useToast from '../toast'

const useFood = () => {
    const [filteredFood, setFood] = useState<Array<I.Food>>([])
    const [sectionedFood, setSectionedFood] = useState<Array<I.Food|string>>([])

    const [showToast] = useToast()
    
    useEffect(() => {
        getFoodApi()
        .then(result => {
            if (typeof result!=='string') {                
                menuStore.loadFoodBase(result)
                setFood(result)
                showToast('база Food обновлена');
            } else {
                showToast(result);
            }
        })
        getTagApi()
        .then(result => {
            if (typeof result!=='string') {                
                menuStore.loadTagBase(result)
                showToast('база Tag обновлена');
            } else {
                showToast(result);
            }
        })                
    }, [])

    useEffect(() => {	
        getSectionApi()
        .then(result => {
            if (typeof result!=='string') {                
                menuStore.loadSectionBase(result)
                let tempSection:Array<I.Food>|undefined
                let tempFull:Array<I.Food|string> = ['']
                menuStore.section.forEach(
                    (item, id) => {
                        tempSection = filteredFood.filter((el)=>
                            el.section==item.id)
                        tempFull.push(item.name)
                        tempFull = tempFull.concat(tempSection)
                    }
                )
                let noSectionFinded = false
                filteredFood.forEach(
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
                setSectionedFood(tempFull)
                showToast('база Section обновлена');
            } else {
                showToast(result);
            }
        })           
    }, [menuStore.food])

    
    //хук возвращает отфильтрованное меню

    const state = {
        filteredFood,
        sectionedFood
    }
    
    return (
        [state,]
    )
}

export default useFood