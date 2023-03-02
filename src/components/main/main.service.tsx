import { useState, useEffect } from 'react'
import * as I from '../../store/storeInterfaces'
import setStore from '../../store/setStore'
import menuStore from '../../store/menuStore'
import FoodList from "../foodList"
import { UseMain } from './main.props'
import { loginWithTokenApi } from '../../api/loginApi'
import {getFoodApi, getSectionApi, getTagApi}  from '../../api/getApi'
import useToast from '../toast'

const useMain:UseMain = () => {
    const [showToast] = useToast()

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
        // todo создание новой записи в заказах
        setStore.setRole('client')
    }

    const userLogined = (role: string) => {
        console.log(role + ' logined')
        setStore.setRole(role)
    }

    useEffect(() => {
        const loginWithToken = async (cookieToken:string) => {
            await loginWithTokenApi(cookieToken)
                .then(result => userLogined((result as I.AuthData).role))
                .catch(result => {  
                    console.log('user not found')                  
                    setStore.setRole('client' )
                    // todo поиск в заказах
                    setStore.setToken(cookieToken)
                })
        }

        let cookieToken = checkCookieToken()        

        if (cookieToken==='') {
            newClient()
        } else {
            loginWithToken(cookieToken)            
        }

    }, [])

    useEffect(() => {
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

        fullGet()
    }, [])

    const state = {
        displayedPage: displayedPage,
        loginButtonText: loginButtonText,
    }

    const api = {
        
    }

    return (
        [state, api]
    )
}
export default useMain