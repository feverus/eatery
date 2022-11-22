import { useState, useEffect } from 'react'
import * as I from '../../store/storeInterfaces'
import setStore from '../../store/setStore'
import { UseMain } from './login.props'
import { loginWithTokenApi } from '../../api/loginApi'

const useMain:UseMain = () => {    
    const [showLogin, setShowLogin] = useState(false)
    const [role, setRole] = useState('')
    const [token, setToken] = useState('')

    const $_GET = (key:string) => {
        const p = window.location.search;
        const match = p.match(new RegExp(key + '=([^&=]+)'));
        return match ? match[1] : false;
    }

    const checkCookieToken = () => {
        let answer = '', cookie
        if (document.cookie.length > 0) {
            let cookies = document.cookie.split(';')            
            for (let i = 0, len = cookies.length; i < len; i++) {
                cookie = cookies[i].split('=')
                if (cookie[0].trim()==='token') answer = cookie[1].trim()
            }
        }
        return answer
    }

    const newClient = () => {
        console.log('newClient')
        setStore.setRole('client')
    }

    const userLogined = () => {
        console.log(role + ' logined')
        setStore.setRole(role)
    }

    const sampleApi = () => {
        return
    }

    useEffect(() => {
        const loginWithToken = async (cookieToken:string) => {
            await loginWithTokenApi(cookieToken)
                .then(result => setRole(result))
                .catch(result => {
                    setRole('client' )
                    setToken(cookieToken)
                })
        }

        console.log('login')

        let cookieToken = checkCookieToken()
        console.log(cookieToken)

        if (cookieToken==='') {
            if ($_GET('login')!==false) {
                setShowLogin(true)
            } else {
                newClient()
            }
        } else {
            loginWithToken(cookieToken)            
        }

    }, [])

    useEffect(() => {        
        const findClientWithToken = async (cookieToken:string) => {
            await loginWithTokenApi(cookieToken)
                .then(result => setRole(result))
                .catch(result => setRole('client' ))
        }
        console.log(role)

        if (role!=='') {
            if (role!=='client') {
                userLogined()
            } else {
                findClientWithToken(token)
            }
        }
    }, [role])


    const state = {
        showLogin: showLogin,
    }

    const api = {
        sampleApi:sampleApi,
    }

    return (
        [state, api]
    )
}
export default useMain