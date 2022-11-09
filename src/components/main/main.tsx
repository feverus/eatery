import {observer, inject} from "mobx-react";
import setStore from "../../store/setStore";
import FoodList from "../foodList";

import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, FocusStyleManager } from "@blueprintjs/core";

export function Main() {
    console.clear()

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