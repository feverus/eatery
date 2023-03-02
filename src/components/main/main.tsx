import * as I from '../../store/storeInterfaces'
import setStore from "../../store/setStore"
import useMain from './main.service'

import {Link} from 'react-router-dom'

import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, FocusStyleManager } from "@blueprintjs/core"

export function Main(props: {page:string}) {  
    const [state, api] = useMain()
    
    FocusStyleManager.onlyShowFocusOnTabs();

	return (
		<>
		<Navbar>
			<NavbarGroup>
                        <NavbarHeading >
                            {setStore.page + ' > ' + setStore.role}
                        </NavbarHeading>
                        <NavbarDivider />
                        <NavbarHeading >                          
                            <Link to={'/login'}>{state.loginButtonText}</Link>
                        </NavbarHeading>                        
            </NavbarGroup>			
		</Navbar>
		
        {state.displayedPage}
		
		</>
	)
}