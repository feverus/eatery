import { useState, useEffect } from 'react'
import setStore from '~Store/setStore'
import useToast from '~Components/toast'
import { loginWithTokenApi } from '~Api/loginApi'
import { getOrderApi, createOrderApi }  from '~Api/orderApi'
import { getFoodApi, getSectionApi, getTagApi, getVersionsApi }  from '~Api/getApi'
import { useDbBasket } from '~/db'
import { UseTopNavigation } from './topNavigation.props'

const useTopNavigation:UseTopNavigation = () => {
  const [dbStateBasket, dbApiBasket] = useDbBasket()

  const defaultStatus = {
    basket: 'Корзина пуста',
    order: 'Ничего не заказано'
  }
  const [basketStatus, setBasketStatus] = useState(defaultStatus.basket)
  const [orderStatus, setOrderStatus] = useState(defaultStatus.order)

	const loginButtonText = (setStore.role==='client')
		? 'Войти'
		: 'Сменить пользователя' 

  useEffect(() => {
    if (dbStateBasket.basket !== undefined) {      
      setBasketStatus((dbStateBasket.count === 0)?
        defaultStatus.basket
        :
        dbStateBasket.count.toString() + '/' + dbStateBasket.total.toString() + '₽')
    }
  }, [dbStateBasket.count, dbStateBasket.total])
  

	const state = {
		loginButtonText: loginButtonText,
    basketStatus: basketStatus,
    orderStatus: orderStatus,
	}

	const api = {
	}

	return (
		[state, api]
	)
}
export default useTopNavigation