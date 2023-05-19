import { useEffect, useState  } from "react"
import { DropResult } from "react-beautiful-dnd"
import * as I from '~Store/storeInterfaces'
import menuStore from "~Store/menuStore"
import useToast from "~Components/toast"
import { uploadAllSectionApi } from "~Api/uploadApi"
import { UseDragable } from "./editFormSection.props"

/** меняет местами два элемента и обновляет версии */
const reorder = (list: I.Section[], startIndex: number, endIndex: number) => {
  const changedIds: string[] = []

  if (startIndex > endIndex) {
    list[startIndex].position = list[endIndex].position
    for (let index = endIndex; index < startIndex; index++) {
      changedIds.push(list[index].id)
      list[index].position = list[index].position + 1      
    }
  } else {    
    list[startIndex].position = list[endIndex].position + 1
    for (let index = startIndex; index <= endIndex; index++) {
      changedIds.push(list[index].id)
      list[index].position = list[index].position - 1     
    }  
  }

  list.forEach(item => {
    item.version = item.version + 1
  })

  return {list, changedIds}
}

const useDragable:UseDragable = () => {
    const [state, setState] = useState({ sections: menuStore.section })
    const [showToast] = useToast()
      
    function onDragEnd(result: DropResult) {  
      if ((!result.destination) || (result.destination.index === result.source.index))
        return
  
      const sections = reorder(
        state.sections,
        result.source.index,
        result.destination.index
      )
            
      showToast(uploadAllSectionApi(sections.list, sections.changedIds))
      menuStore.loadSectionBase(sections.list)
    }

    useEffect(() => {
      setState({ 'sections': menuStore.section })
    }, [menuStore.section])

    const dragState = {
        sections:state.sections,
    }

    const dragApi = {
        setState: () => setState,
        onDragEnd: onDragEnd,
    }
    
    return ([
        dragState,
        dragApi
    ])
}

export default useDragable