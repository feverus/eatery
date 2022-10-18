import {observer, inject} from "mobx-react";

import menuStore from '../../store/menuStore'
import setStore from "../../store/setStore";

import FoodList from "../foodList";

import {
    Navbar, NavbarDivider, NavbarGroup, NavbarHeading, FocusStyleManager 
} from "@blueprintjs/core";

const Main = () => {
    let displayedPage:JSX.Element
    switch(setStore.page) {
        case 'food-list':
            displayedPage = <FoodList /> 
            break;
        default: displayedPage = <FoodList />
    }
    
    FocusStyleManager.onlyShowFocusOnTabs();

	return (
		<>
		<Navbar>
			<NavbarGroup>
                        <NavbarHeading>{setStore.page}</NavbarHeading>
                        <NavbarDivider />
            </NavbarGroup>			
		</Navbar>
		
        {displayedPage}
		
		</>
	)
}

  

export default
	inject('menuStore','setStore')
	(observer(Main));