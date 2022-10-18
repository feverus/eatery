import { useState, useEffect } from 'react'

import * as I from '../../store/storeInterfaces'
import menuStore from '../../store/menuStore'
import setStore from "../../store/setStore"
import getFoodApi from '../../api/getApi'
import useToast from '../toast'

type ControlCallback = () => void;

type UseFoodCard = () => [
        state: {
            count:number;
        },
        api: {
            add:ControlCallback
            remove:ControlCallback
        }
    ]

const useFoodCard:UseFoodCard = () => {
    const [count, setCount] = useState(0)
    const [showToast] = useToast()

    const add = () => {
        setCount(count+1)
    }
    const remove = () => {
        if (count>0) setCount(count-1)
    }

    const state = {
        count,
    }
    const api = {
        add,
        remove
    }
    
    return (
        [state,api]
    )
}

export default useFoodCard