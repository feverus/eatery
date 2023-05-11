import { Link } from 'react-router-dom';
import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Icon } from "@blueprintjs/core";
import setStore from "~Store/setStore";
import C from './topNavigation.module.scss'
import useTopNavigation from './topNavigation.service'

export function TopNavigation() {
    const [state, api] = useTopNavigation()
    return (
        <Navbar>
            <NavbarGroup className={C.navbar}>
                <NavbarHeading>
                    <Icon icon="person" />
                    {setStore.name}
                </NavbarHeading>
                <NavbarDivider />
                <NavbarHeading>
                    <Icon icon="page-layout" />
                    {setStore.page}
                </NavbarHeading>
                <NavbarDivider />
                <NavbarHeading>
                    <Icon icon="shop" />
                    {state.orderStatus}
                </NavbarHeading>
                <NavbarDivider />
                <NavbarHeading>
                    <Icon icon="shopping-cart" />
                    <Link to={'/basket'}>{state.basketStatus}</Link>
                </NavbarHeading>
                <NavbarDivider />
                <NavbarHeading>
                    <Link to={'/login'}>{state.loginButtonText}</Link>
                </NavbarHeading>
            </NavbarGroup>
        </Navbar>
    )
}
