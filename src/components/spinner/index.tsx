import {observer} from "mobx-react"
import { Spinner } from "@blueprintjs/core"
import setStore from "~Store/setStore"
import C from './spinner.module.scss'

const GlobalSpinner = () => {
  if (setStore.disabledInteractions) return (
    <Spinner className={C.allScreen} size={200} />
  )
  return <></>
}

export default
	(observer(GlobalSpinner));