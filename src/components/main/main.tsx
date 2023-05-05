import {Link} from 'react-router-dom'
import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, FocusStyleManager, Icon } from "@blueprintjs/core"
import setStore from "~Store/setStore"
import useMain from './main.service'
import { AskNameDialog } from './askNameDialog'
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
                    {setStore.name}
                </NavbarHeading>
                <NavbarDivider />
                <NavbarHeading >                            
                    <Icon icon="page-layout"/>
                    {setStore.page }
                </NavbarHeading>
                <NavbarDivider />
                <NavbarHeading >                            
                    <Icon icon="shop"/>
                    {state.orderStatus}
                </NavbarHeading>
                <NavbarDivider />
                <NavbarHeading >                            
                    <Icon icon="shopping-cart"/>
                    <Link to={'/basket'}>{state.basketStatus}</Link>
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