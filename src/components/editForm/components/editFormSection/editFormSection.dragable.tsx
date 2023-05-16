import { useState } from "react"
import { UseDragable } from "./editFormSection.props"
import * as I from '~Store/storeInterfaces'
import menuStore from "~Store/menuStore"

const reorder = (list: I.Section[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
  
    return result
}

const useDragable:UseDragable = () => {
    const [state, setState] = useState({ sections: menuStore.section });
  
    function onDragEnd(result: { destination: { index: any; }; source: { index: any; }; }) {
  
      if ((!result.destination) || (result.destination.index === result.source.index))
        return
  
      const sections = reorder(
        state.sections,
        result.source.index,
        result.destination.index
      );
  
      setState({ sections });
    }

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