import { useState, useEffect } from 'react'
import { Button, Position, Toast, Toaster, Intent } from "@blueprintjs/core";
import { BlueprintIcons_16Id } from '@blueprintjs/icons/lib/esm/generated/16px/blueprint-icons-16';

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = Toaster.create({   
    className: "recipe-toaster" ,
    position: Position.BOTTOM_LEFT,
});

const useToast = () => {
    const showToast = (message:string, type:string = 'info') => {
        let icon:BlueprintIcons_16Id = 'tick'
        let intent:Intent = Intent.PRIMARY
        switch(type) {
            case 'info': 
                icon = 'tick-circle'
                intent = Intent.SUCCESS
                break;
            case 'error':
                icon = 'disable'
                intent = Intent.DANGER  
                break;     
            default: break;        
        }
        // create toasts in response to interactions.
        // in most cases, it's enough to simply create and forget (thanks to timeout).
        AppToaster.show({ message: message, icon: icon, intent:intent});
    }
    return [showToast]
}

export default useToast