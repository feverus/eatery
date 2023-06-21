import { FocusStyleManager } from "@blueprintjs/core"
import useMain from './main.service'
import { AskNameDialog } from './components/askNameDialog'
import TopNavigation from '~Components/topNavigation'
import GlobalSpinner from '~Components/spinner'

export function Main(props: {page:string}) {  
	const [state, api] = useMain(props.page)
	
	FocusStyleManager.onlyShowFocusOnTabs();

	return (
		<>
			<TopNavigation/>
		
			{state.displayedPage}
	
			{state.showAskNameDialog && <AskNameDialog go={api.go} />}

			<GlobalSpinner />
        
		</>
	)
}


