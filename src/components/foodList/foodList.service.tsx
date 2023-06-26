import { useState, useEffect } from 'react'

import * as I from '~Store/storeInterfaces'
import menuStore from '~Store/menuStore'
import setStore from '~Store/setStore'
import editFormStore from '~Store/editFormStore'
import { UseFoodList } from "./foodList.props"

const useFoodList:UseFoodList = () => {
	const [filteredFood, setFiltereFood] = useState<Array<I.Food>>([])
	const [sectionedFood, setSectionedFood] = useState<Array<I.Food|string>>([])
	
	useEffect(() => {
		setStore.setPage('Меню')
	}, [])

	const menuSort = (menu: I.Food[]) => {
		switch (setStore.sortType) {
			case 'abc':
				menu.sort((a, b) => setStore.sortDirection ?
					b.name.localeCompare(a.name)
					:
					a.name.localeCompare(b.name) 
				)
				break;			
			case 'price':
				menu.sort((a, b) => setStore.sortDirection ?
					b.price - a.price 				
					:
					a.price - b.price 
				)
				break;			
			default:
				break;
		}
		return menu
	}

	useEffect(() => {

		if (menuStore.food.length>0) {
			let tempSection:Array<I.Food>|undefined
			let tempFull:Array<I.Food|string> = ['']
			let noSectionFinded = false

			menuStore.section.forEach(
				(item) => {
					tempSection = menuStore.food.filter((el)=>
						el.section==item.id)
						
					if (setStore.sortType !== undefined)  tempSection = menuSort(tempSection)

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
			setSectionedFood(tempFull)
		}
	}, [menuStore.food, menuStore.tag, menuStore.section, setStore.sortType, setStore.sortDirection])

useEffect(() => {
	if (!setStore.foodFilterActive) return

	let f:Array<I.Food> = menuStore.food.slice()
	if (setStore.searchPrompt.length > 0) f = f.filter(item => 
		item.name.toLocaleLowerCase().includes(setStore.searchPrompt) ||
		item.info.toLocaleLowerCase().includes(setStore.searchPrompt)
	)

	if (setStore.goodTags.length > 0) f = f.filter(item => 
		setStore.goodTags.every(tag => item.tags.includes(tag))
	)

	if (setStore.badTags.length > 0) f = f.filter(item => 
		item.tags.every(tag => !setStore.badTags.includes(tag))
	)

	if (setStore.sortType !== undefined)  f = menuSort(f)

	setFiltereFood(f)

}, [setStore.foodFilterActive, setStore.badTags, setStore.goodTags, setStore.searchPrompt, setStore.sortType, setStore.sortDirection])


	
	const openEditForm = (formType: string) => {
		editFormStore.openForm(formType, undefined)
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