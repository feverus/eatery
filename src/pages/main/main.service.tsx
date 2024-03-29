import { useState, useEffect } from 'react'
import { setCookie } from 'react-use-cookie'
import * as I from '~Store/storeInterfaces'
import setStore from '~Store/setStore'
import menuStore from '~Store/menuStore'
import { ORDER_RECIEVE_TIMEOUT, ZERO_TIME } from '~Store/consts'
import useToast from '~Components/toast'
import FoodList, { FoodDetail } from "~Components/foodList"
import { BasketList } from '~Components/basketList'
import { loginWithTokenApi } from '~Api/loginApi'
import { getOrderApi, createOrderApi, getAllOrdersApi }  from '~Api/orderApi'
import { getFoodApi, getSectionApi, getTagApi, getVersionsApi }  from '~Api/getApi'
import { useDbMenu } from '~/db'
import { UseMain } from './main.props'
import { checkCookieToken } from '~Api/checkCookieToken'
import orderListStore from '~/store/orderListStore'

const userLogined = (role: string) => {
	console.log(role + ' logined')
	setStore.setRole(role)
	setStore.setName(role)
}

const setTimeDelta = (time: number) => {
	let now = new Date()
	//console.log('time', time, ~~((now.getTime() - ZERO_TIME*1000) / 1000))
	setStore.setTimeDelta(time - ~~((now.getTime() - ZERO_TIME*1000) / 1000))
}

const loginWithToken = async (cookieToken:string) => {
	await loginWithTokenApi(cookieToken)
		.then(result => {	
			if ('error' in result && (result.error.search('401 Unauthorized')!==-1)) {
				console.log('user not found')
				setStore.setToken(cookieToken)
				setTimeDelta(result.result.time)
			} else {
				setTimeDelta((result as I.AuthData).time)
				userLogined((result as I.AuthData).role) 
			}           
		})                   
		.catch(error => {  
			console.log(error)
		})
}

const definePage = (page:string):JSX.Element => {
	if (page==='basket') return <BasketList />
	if (page==='order-list') return <FoodDetail />
	if (page==='foodDetail') return <FoodDetail />
	return <FoodList />
}

const useMain:UseMain = (page) => {
	const [showToast] = useToast()
	const [dbStateMenu, dbApiMenu] = useDbMenu()

	const [showAskNameDialog, setShowAskNameDialog] = useState(false)
  const [cookieToken, setCookieToken] = useState<undefined | string>(undefined)

	const newClient = () => {
		console.log('new Client')
		setStore.setRole('client')
		setShowAskNameDialog(true)
	}

	const go = async (name: string) => {        
		await createOrderApi(name)
			.then(result => {
				if (typeof(result)==='string') {
					console.log('order creating error')
				} else {
					setStore.setToken(result.id) 
					setCookie('token', result.id)
					setShowAskNameDialog(false)
					setStore.setName(name)
				}           
			})                   
			.catch(error => {  
				console.log(error)
			})        
	}

	const findOrder = async () => {
    if (cookieToken !== undefined)
      await getOrderApi(cookieToken)
        .then(result => {
          if ((typeof(result)==='string') && (result.search('400 Bad Request')!==-1)) {
            console.log('order not found')
            setStore.setRole('client')
            newClient()
          } else {
            console.log('Привет, '+(result as I.OrderData).name)
            setStore.setRole('client')
            setStore.setOrder((result as I.OrderData).food, (result as I.OrderData).version)
            setStore.setName((result as I.OrderData).name)
          }
        })                
        .catch(error => {  
          console.log(error)
          newClient()
        })
	}

	const tryToFindUser = async () => {
    if (cookieToken !== undefined)
      await loginWithToken(cookieToken)
    if (setStore.role==='') findOrder()
	}

	const fullGet = async () => {
		let food: I.Food[] = [], tag: I.Tag[] = [], section: I.Section[] = []
		let resultMessage = ''
		let needGetFromApi:Array<string> = []

		await getVersionsApi()
		.then(result => {
			if (typeof result!=='string') {
				if (dbStateMenu.versions === undefined) return            

				if ((dbStateMenu.versions.length === 0)) {
					result.forEach(item => needGetFromApi.push(item.name))
					dbApiMenu.putItems('versions', result)                    
				} else {
					result.forEach((item, index) => {
						let dbVersion = dbStateMenu.versions?.find(v => v.name === item.name)
						if (dbVersion === undefined) dbVersion = {name: item.name, version: -1}

						if (item.version > dbVersion.version) needGetFromApi.push(item.name)
					})
				}
			} else {
				resultMessage = result
			}
		})

		if (needGetFromApi.includes('food'))
			await getFoodApi()
			.then(result => {
				if (typeof result!=='string') {               
					food = result
				} else {
					resultMessage =  resultMessage + ' | ' + result
				}
			})
		else if (dbStateMenu.food!==undefined )
			food = dbStateMenu.food

		if (needGetFromApi.includes('tag'))
			await getTagApi()
			.then(result => {
				if (typeof result!=='string') {               
					tag = result
				} else {
					resultMessage = resultMessage + ' | ' + result
				}
			}) 
		else if (dbStateMenu.tag!==undefined )
			tag = dbStateMenu.tag 

		if (needGetFromApi.includes('section'))
			await getSectionApi()
			.then(result => {
				if (typeof result!=='string') {                
					section = result
				} else {
					resultMessage = resultMessage + ' | ' + result
				}
			})
		else if (dbStateMenu.section!==undefined )
		section = dbStateMenu.section 

		if ((needGetFromApi.length > 0) && (resultMessage === '')) resultMessage = 'Базы обновлены'

		if (resultMessage !== '') {
			showToast(resultMessage)
		}     
		
		dbApiMenu.putItems('food', food)
		dbApiMenu.putItems('tag', tag)
		dbApiMenu.putItems('section', section)
		
		menuStore.loadFoodBase(food)
		menuStore.loadTagBase(tag)
		menuStore.loadSectionBase(section)
		
		setStore.setDisabledInteractions(false)
	}

  useEffect(() => {
    if (cookieToken === undefined)
      setCookieToken(checkCookieToken())  
  }, [])

	useEffect(() => {
		fullGet()

		if (cookieToken==='') {
			newClient()
		} else {
			tryToFindUser()
		}

	}, [dbStateMenu.versions])

	
	useEffect(() => {
		let timerUpdateOrdersList: number | NodeJS.Timeout
		if (setStore.role !== 'client') {
			timerUpdateOrdersList = setInterval(() => {
				getAllOrdersApi()	
				.then(result => {
					if (typeof result!=='string') orderListStore.setOrders(result as I.OrderData[])
				})
				.catch(error => {  
					console.log(error)
				})				
			}, ORDER_RECIEVE_TIMEOUT)
		}
		return(
			() => clearInterval(timerUpdateOrdersList)
		)			
  }, [setStore.token, setStore.role])

	useEffect(() => {
		if (setStore.token!=='') {
			let timerUpdateOrder: number | NodeJS.Timeout
			if (setStore.role === 'client') {
				timerUpdateOrder = setInterval(() => {
					getOrderApi(setStore.token)
					.then(result => {
						setStore.setOrder((result as I.OrderData).food, (result as I.OrderData).version)
					})
					.catch(error => {  
						console.log(error)
					})
				}, ORDER_RECIEVE_TIMEOUT)
			}
			return(
				() => clearInterval(timerUpdateOrder)
			)			
		}

  }, [setStore.token, setStore.role])
	
	const state = {
		displayedPage: definePage(page),
		showAskNameDialog: showAskNameDialog,
	}

	const api = {
		go: go,
	}

	return (
		[state, api]
	)
}
export default useMain