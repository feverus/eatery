import { useState, useEffect } from 'react'
import * as I from '../../store/storeInterfaces'
import setStore from '../../store/setStore'
import menuStore from '../../store/menuStore'
import FoodList from "../foodList"
import { UseMain } from './main.props'
import { loginWithTokenApi } from '../../api/loginApi'
import {getFoodApi, getSectionApi, getTagApi }  from '../../api/getApi'
import { getOrderApi, createOrderApi }  from '../../api/orderApi'
import useToast from '../toast'
import { setCookie } from 'react-use-cookie'

const useMain:UseMain = () => {
    const [showToast] = useToast()
    const [showAskNameDialog, setShowAskNameDialog] = useState(false)

    let displayedPage:JSX.Element = <FoodList />
    const loginButtonText = (setStore.role==='client')
        ? 'Войти'
        : 'Сменить пользователя' 

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

    const findOrder = async (cookieToken:string) => {
        await getOrderApi(cookieToken)
            .then(result => {
                if ((typeof(result)==='string') && (result.search('400 Bad Request')!==-1)) {
                    console.log('order not found')
                    setStore.setRole('client' )
                    newClient()
                } else {
                    console.log('Привет, '+(result as I.OrderData).name)
                    setStore.setName((result as I.OrderData).name)
                }
            })                
            .catch(error => {  
                console.log(error)
                newClient()
            })
    }

    const tryToFindUser = async (cookieToken: string) => {
        await loginWithToken(cookieToken)
        if (setStore.role==='') findOrder(cookieToken)
    }

    const fullGet = async () => {
        let food: I.Food[] = [], tag: I.Tag[] = [], section: I.Section[] = []
        let resultMessage = 'Базы обновлены'

        await getFoodApi()
        .then(result => {
            if (typeof result!=='string') {               
                food = result
            } else {
                resultMessage = result
            }
        })
        await getTagApi()
        .then(result => {
            if (typeof result!=='string') {               
                tag = result
            } else {
                resultMessage = resultMessage + ' | ' + result
            }
        })  
        await getSectionApi()
        .then(result => {
            if (typeof result!=='string') {                
                section = result
            } else {
                resultMessage = resultMessage + ' | ' + result
            }
        })
                    
        menuStore.loadFoodBase(food)
        menuStore.loadTagBase(tag)
        menuStore.loadSectionBase(section)
        showToast(resultMessage)           
    }

    useEffect(() => {
        let cookieToken = checkCookieToken()    
        
        fullGet()

        if (cookieToken==='') {
            newClient()
        } else {
            tryToFindUser(cookieToken)
        }

    }, [])

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