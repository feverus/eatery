import { Link } from 'react-router-dom'
import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Icon } from "@blueprintjs/core"
import setStore from "~Store/setStore"
import C from './topNavigation.module.scss'
import useTopNavigation from './topNavigation.service'

export function TopNavigation() {
    const [state, api] = useTopNavigation()
    return (
        <Navbar className={C.navbar}>
            <NavbarGroup className={C.group}>
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
                
                {state.orderWidget}
                {state.basketWidget}

                <NavbarHeading>
                    <Link to={'/login'}>{state.loginButtonText}</Link>
                </NavbarHeading>
            </NavbarGroup>
        </Navbar>
    )
}
