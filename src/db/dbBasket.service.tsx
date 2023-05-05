import { UseDbBasket } from './db.props'
import { dbBasket } from './DbBasket'
import { useLiveQuery } from 'dexie-react-hooks'
import menuStore from '~Store/menuStore'
import { useEffect, useState } from 'react'

export const useDbBasket:UseDbBasket = () => {     
	const basket = useLiveQuery(() => {return dbBasket.basket.toArray()})
	const [count, setCount] = useState(0)
	const [total, setTotal] = useState(0)

	const findInBasketById = (id: string) => {
		return basket?.find(item => item.id === id)
	}

	const createBasketItem = (id: string) => {
		dbBasket.basket.add({
			id: id, count: 1
		})
	}

	const deleteBasketItem = (id: string) => {
		dbBasket.basket
			.where({id: id})
			.delete()   
	}

	const incBasketItem = (id: string) => {
		const finded = findInBasketById(id)
		if (finded) 
			dbBasket.basket
				.where({id: id})
				.modify({id: id, count: finded.count + 1})
		else
			createBasketItem(id)
	}

	const decBasketItem = (id: string) => {
		const finded = findInBasketById(id)
		if (finded) 
			if (finded.count === 1) 
				deleteBasketItem(id)
			else
				dbBasket.basket
					.where({id: id})
					.modify({id: id, count: finded.count - 1})
	}

	useEffect(() => {
		if (basket !== undefined) {
			const newCount = basket.reduce((acc, food) => acc + food.count, 0)
			const newTotal = basket.reduce((acc, food) => {
				const foodItem = menuStore.food.find(item => item.id === food.id)

				const price = (foodItem === undefined) ? 0 : foodItem.price * food.count
				return acc + price
			}, +0)
			
			setCount(newCount)    
			setTotal(newTotal)  
		}
	}, [basket, menuStore.food])  

	const state = {
		basket: basket,
		total: total,
		count: count,
	}
	
	const api = {
		findInBasketById: findInBasketById,
		createBasketItem: createBasketItem,
		incBasketItem: incBasketItem,
		decBasketItem: decBasketItem,
		deleteBasketItem: deleteBasketItem,
	}

	return (
		[state, api]
	)
}