import { useState, useEffect } from 'react'
import setStore from '~Store/setStore'
import { useDbBasket } from '~/db'
import { UseTopNavigation } from './topNavigation.props'
import { TopNavWidget } from './components/topNavWidget'

const currency = '₽'
  
const defaultStatus = {
  basket: 'Корзина пуста',
  order: 'Ничего не заказано'
}

const useTopNavigation:UseTopNavigation = () => {
  const [dbStateBasket, dbApiBasket] = useDbBasket()
  const [basketStatus, setBasketStatus] = useState(defaultStatus.basket)
  const [orderStatus, setOrderStatus] = useState(defaultStatus.order)
  const [loginButtonText, setLoginButtonText] = useState('Войти')

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 800) {
        setStore.setMobileView(false)
      } else {
        setStore.setMobileView(true)
      }       
    }
  
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    if (dbStateBasket.basket !== undefined) {
      setBasketStatus((dbStateBasket.count === 0) ?
        defaultStatus.basket
        :
        dbStateBasket.count.toString() + ' / ' + dbStateBasket.total.toString() + ' '+ currency)
    }
  }, [dbStateBasket.count, dbStateBasket.total])

  useEffect(() => {
    switch (setStore.orderStatus) {
      case 1:
        setOrderStatus('Готовится / ' + setStore.orderTotal.toString() + currency)
        break;
      case 2:
        setOrderStatus('Выдан / ' + setStore.orderTotal.toString() + currency)
        break;
      case 4:
        setOrderStatus('Возникла проблема')
        break;
    
      default:
        setOrderStatus(defaultStatus.order)
        break;
    }
  
  }, [setStore.orderStatus, setStore.orderTotal])
  
  useEffect(() => {
    setLoginButtonText((setStore.role==='client') ?
      'Войти'
      :
      'Сменить пользователя')
  }, [setStore.role])

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