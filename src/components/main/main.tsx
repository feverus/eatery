import * as I from '../../store/storeInterfaces'
import setStore from "../../store/setStore";
import menuStore from '../../store/menuStore'
import FoodList from "../foodList";
import { useState, useEffect } from 'react'
import {getFoodApi, getSectionApi, getTagApi}  from '../../api/getApi'
import useToast from '../toast'
import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, FocusStyleManager } from "@blueprintjs/core";
import Login from '../login';

export function Main() {
    const [showToast] = useToast()

    useEffect(() => {
        const fullGet = async () => {
            let food: I.Food[] = [], tag: I.Tag[] = [], section: I.Section[] = []
            let resultMessage = 'Базы обновлены'

            await getFoodApi()
            .then(result => {
                if (typeof result!=='string') {               
                    food = result
                } else {
                    resultMessage = result
                }
            })
            await getTagApi()
            .then(result => {
                if (typeof result!=='string') {               
                    tag = result
                } else {
                    resultMessage = resultMessage + ' | ' + result
                }
            })  
            await getSectionApi()
            .then(result => {
                if (typeof result!=='string') {                
                    section = result
                } else {
                    resultMessage = resultMessage + ' | ' + result
                }
            })
                        
            menuStore.loadFoodBase(food)
            menuStore.loadTagBase(tag)
            menuStore.loadSectionBase(section)
            showToast(resultMessage)           
        }

        fullGet()
    }, [])

    

    let displayedPage:JSX.Element
    
    switch(setStore.role) {
        case '':
            displayedPage = <Login /> 
            break;
        case 'guest':
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