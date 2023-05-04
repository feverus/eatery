import * as I from '~Store/storeInterfaces'
import setStore from "~Store/setStore"
import useMain from './main.service'
import { AskNameDialog } from './askNameDialog'

import {Link} from 'react-router-dom'

import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, FocusStyleManager, Icon } from "@blueprintjs/core"
import C from './main.module.scss'

export function Main(props: {page:string}) {  
    const [state, api] = useMain()
    
    FocusStyleManager.onlyShowFocusOnTabs();

	return (
		<>
		<Navbar>
			<NavbarGroup className={C.navbar}>
                <NavbarHeading>
                    <Icon icon="person"/>
                    <span>{setStore.name}</span>
                </NavbarHeading>
                <NavbarDivider />
                <NavbarHeading >                            
                    <Icon icon="page-layout"/>
                    {setStore.page }
                </NavbarHeading>
                <NavbarDivider />
                <NavbarHeading >                          
                    <Link to={'/login'}>{state.loginButtonText}</Link>
                </NavbarHeading>                        
            </NavbarGroup>			
		</Navbar>
		
        {state.displayedPage}
		
        {state.showAskNameDialog && <AskNameDialog go={api.go} />}
        
		</>
	)
}