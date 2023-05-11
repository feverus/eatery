import { useState, useEffect } from 'react'
import { Navbar, NavbarGroup } from "@blueprintjs/core"
import setStore from '~Store/setStore'
import useToast from '~Components/toast'
import { loginWithTokenApi } from '~Api/loginApi'
import { getOrderApi, createOrderApi }  from '~Api/orderApi'
import { getFoodApi, getSectionApi, getTagApi, getVersionsApi }  from '~Api/getApi'
import { useDbBasket } from '~/db'
import { UseTopNavigation } from './topNavigation.props'
import { TopNavWidget } from './components/topNavWidget'

const useTopNavigation:UseTopNavigation = () => {
  const [dbStateBasket, dbApiBasket] = useDbBasket()

  const defaultStatus = {
    basket: 'Корзина пуста',
    order: 'Ничего не заказано'
  }
  const [basketStatus, setBasketStatus] = useState(defaultStatus.basket)
  const [orderStatus, setOrderStatus] = useState(defaultStatus.order)

  useEffect(() => {
    if (dbStateBasket.basket !== undefined) {
      setBasketStatus((dbStateBasket.count === 0)?
        defaultStatus.basket
        :
        dbStateBasket.count.toString() + '/' + dbStateBasket.total.toString() + '₽')
    }
  }, [dbStateBasket.count, dbStateBasket.total])
  
	const loginButtonText = (setStore.role==='client')
		? 'Войти'
		: 'Сменить пользователя' 

  const basketWidget = (setStore.role==='client')
    ? <TopNavWidget icon={"shopping-cart"} url={'/basket'} title={basketStatus} />
    : <></>
    
  const orderWidget = (setStore.role==='client')
    ? <TopNavWidget icon={"shop"} url={'/order'} title={orderStatus} />
    : <></>

	const state = {
		loginButtonText: loginButtonText,
    basketWidget: basketWidget,
    orderWidget: orderWidget,
	}

	const api = {
	}

	return (
		[state, api]
	)
}
export default useTopNavigation