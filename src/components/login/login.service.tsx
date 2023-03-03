import { useState, useEffect, useRef } from 'react'
import * as I from '../../store/storeInterfaces'
import setStore from '../../store/setStore'
import { UseLogin } from './login.props'
import { loginWithPasswordApi } from '../../api/loginApi'
import useToast from '../toast'
import { useNavigate } from "react-router-dom"
import { setCookie } from 'react-use-cookie'

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