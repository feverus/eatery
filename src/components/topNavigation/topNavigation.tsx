import { Link } from 'react-router-dom'
import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Icon } from "@blueprintjs/core"
import setStore from "~Store/setStore"
import C from './topNavigation.module.scss'
import useTopNavigation from './topNavigation.service'
import { TopNavWidget } from './components/topNavWidget'

export function TopNavigation() {
	const [state, api] = useTopNavigation()
	return (
		<Navbar className={C.navbar}>
			<NavbarGroup className={C.group}>
				<TopNavWidget icon={"person"} title={setStore.name} link={false} />

				{setStore.page !== 'Меню' && 
					<TopNavWidget icon={"home"} url={'/'} title={"Меню"} link={true} />
				}

				<TopNavWidget icon={"page-layout"} title={setStore.page} link={false} />
				
				{state.orderWidget}
				{state.basketWidget}

				<TopNavWidget url={'/login'} title={state.loginButtonText} link={true} />
			</NavbarGroup>
		</Navbar>
	)
}
