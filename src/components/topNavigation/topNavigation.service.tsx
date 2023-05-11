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
  const currency = '₽'
  
  const defaultStatus = {
    basket: 'Корзина пуста',
    order: 'Ничего не заказано'
  }

  const [dbStateBasket, dbApiBasket] = useDbBasket()
  const [basketStatus, setBasketStatus] = useState(defaultStatus.basket)
  const [orderStatus, setOrderStatus] = useState(defaultStatus.order)
  const [orderClassName, setOrderClassName] = useState('')
  const [loginButtonText, setLoginButtonText] = useState('Войти')

  useEffect(() => {
    if (dbStateBasket.basket !== undefined) {
      setBasketStatus((dbStateBasket.count === 0)?
        defaultStatus.basket
        :
        dbStateBasket.count.toString() + ' / ' + dbStateBasket.total.toString() + currency)
    }
  }, [dbStateBasket.count, dbStateBasket.total])

  useEffect(() => {
    switch (setStore.orderStatus) {
      case 1:
        setOrderStatus('Готовится / ' + setStore.orderTotal.toString() + currency)
        setOrderClassName('progress')
        break;
      case 2:
        setOrderStatus('Выдан / ' + setStore.orderTotal.toString() + currency)
        setOrderClassName('ready')
        break;
      case 4:
        setOrderStatus('Возникла проблема')
        setOrderClassName('error')
        break;
    
      default:
        setOrderStatus(defaultStatus.order)
        setOrderClassName('')
        break;
    }
  
  }, [setStore.orderStatus, setStore.orderTotal])
  
  useEffect(() => {
    setLoginButtonText((setStore.role==='client')
		? 'Войти'
		: 'Сменить пользователя')
  }, [setStore.role])

  const basketWidget = (setStore.role==='client')
    ? <TopNavWidget icon={"shopping-cart"} url={'/basket'} title={basketStatus} />
    : <></>
    
  const orderWidget = (setStore.role==='client')
    ? <TopNavWidget icon={"shop"} url={'/order'} title={orderStatus} className={orderClassName} />
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