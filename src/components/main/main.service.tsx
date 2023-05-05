import { useState, useEffect } from 'react'
import { setCookie } from 'react-use-cookie'
import * as I from '~Store/storeInterfaces'
import setStore from '~Store/setStore'
import menuStore from '~Store/menuStore'
import FoodList from "~Components/foodList"
import useToast from '~Components/toast'
import { loginWithTokenApi } from '~Api/loginApi'
import { getOrderApi, createOrderApi }  from '~Api/orderApi'
import { getFoodApi, getSectionApi, getTagApi, getVersionsApi }  from '~Api/getApi'
import { useDbMenu } from '~/db'
import { UseMain } from './main.props'

const checkCookieToken = () => {
	let answer = '', cookie
	if (document.cookie.length > 0) {
		let cookies = document.cookie.split(';')            
		for (let i = 0, len = cookies.length; i < len; i++) {
			cookie = cookies[i].split('=')
			if (cookie[0].trim()==='token') answer = cookie[1].trim()
		}
	}
	console.log('cookie token: ' + answer)
	return answer
}

const userLogined = (role: string) => {
	console.log(role + ' logined')
	setStore.setRole(role)
	setStore.setName(role)
}

const loginWithToken = async (cookieToken:string) => {
	await loginWithTokenApi(cookieToken)
		.then(result => {
			if ((typeof(result)==='string') && (result.search('401 Unauthorized')!==-1)) {
				console.log('user not found')
				setStore.setToken(cookieToken)
			} else {
				userLogined((result as I.AuthData).role) 
			}           
		})                   
		.catch(error => {  
			console.log(error)
		})
}

const useMain:UseMain = () => {
	const [showToast] = useToast()
	const [showAskNameDialog, setShowAskNameDialog] = useState(false)
  const [cookieToken, setCookieToken] = useState<undefined | string>(undefined)
	const [dbState, dbApi] = useDbMenu()

	let displayedPage:JSX.Element = <FoodList />
	const loginButtonText = (setStore.role==='client')
		? 'Войти'
		: 'Сменить пользователя' 

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
				if (dbState.versions === undefined) return            

				if ((dbState.versions.length === 0)) {
					result.forEach(item => needGetFromApi.push(item.name))
					dbApi.putItems('versions', result)                    
				} else {
					result.forEach((item, index) => {
						let dbVersion = dbState.versions?.find(v => v.name === item.name)
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
		else if (dbState.food!==undefined )
			food = dbState.food

		if (needGetFromApi.includes('tag'))
			await getTagApi()
			.then(result => {
				if (typeof result!=='string') {               
					tag = result
				} else {
					resultMessage = resultMessage + ' | ' + result
				}
			}) 
		else if (dbState.tag!==undefined )
			tag = dbState.tag 

		if (needGetFromApi.includes('section'))
			await getSectionApi()
			.then(result => {
				if (typeof result!=='string') {                
					section = result
				} else {
					resultMessage = resultMessage + ' | ' + result
				}
			})
		else if (dbState.section!==undefined )
		section = dbState.section 

		if ((needGetFromApi.length > 0) && (resultMessage === '')) resultMessage = 'Базы обновлены'

		dbApi.putItems('food', food)
		dbApi.putItems('tag', tag)
		dbApi.putItems('section', section)

		menuStore.loadFoodBase(food)
		menuStore.loadTagBase(tag)
		menuStore.loadSectionBase(section)

		if (resultMessage !== '') showToast(resultMessage)           
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

	}, [dbState.versions])

	const state = {
		displayedPage: displayedPage,
		loginButtonText: loginButtonText,
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