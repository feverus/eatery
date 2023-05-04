import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { setCookie } from 'react-use-cookie'
import * as I from '~Store/storeInterfaces'
import setStore from '~Store/setStore'
import { loginWithPasswordApi } from '~Api/loginApi'
import useToast from '~Components/toast'
import { UseLogin } from './login.props'

const useLogin:UseLogin = () => { 
    const navigate = useNavigate()
    const [showToast] = useToast()
    const inputLogin = useRef('')
    const inputPassword = useRef('')

    const login = async () => {
        console.log('login')
        await loginWithPasswordApi(inputLogin.current || '', inputPassword.current || '')
        .then(result => {
            if ((typeof(result)==='string') && (result.search('401 Unauthorized')!==-1)) 
                showToast('Неверные данные для входа')
            else {
                setStore.setRole((result as I.AuthData).role)
                setCookie('token', (result as I.AuthData).token)
                navigate('/') 
            }           
        })
        .catch(error => {
            console.log(error)
            showToast('Ошибка авторизации')
        })
    }

    const logout = () => {
        setStore.setRole('client')
        setStore.setName('Гость')
        setCookie('token', '', {days: 0})
        navigate('/') 
    }

    const setInputLogin = (value:string) => {
        inputLogin.current = value
    }

    const setInputPassword = (value:string) => {
        inputPassword.current = value
    }

    const state = {
        inputLogin: inputLogin.current,
        inputPassword: inputPassword.current,
    }

    const api = {
        login: login,
        logout: logout,
        setInputLogin: setInputLogin,
        setInputPassword: setInputPassword,
    }

    return (
        [state, api]
    )
}
export default useLogin