import {observer, inject} from "mobx-react";

import menuStore from '../../store/menuStore'
import setStore from "../../store/setStore";

import FoodList from "../foodList";

import {
    Alignment,
    Button,
    Classes,
    H5,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
} from "@blueprintjs/core";

const Main = () => {
	return (
		<>
		<Navbar>
			<NavbarGroup>
                        <NavbarHeading>{setStore.page}</NavbarHeading>
                        <NavbarDivider />
            </NavbarGroup>			
		</Navbar>
		
		<FoodList />
		</>
	)
}

  

export default
	inject('menuStore','setStore')
	(observer(Main));