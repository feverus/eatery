import { FocusStyleManager } from "@blueprintjs/core"
import useMain from './main.service'
import { AskNameDialog } from './askNameDialog'
import TopNavigation from '~Components/topNavigation'

export function Main(props: {page:string}) {  
	const [state, api] = useMain()
	
	FocusStyleManager.onlyShowFocusOnTabs();

	return (
		<>
			<TopNavigation/>
		
			{state.displayedPage}
	
			{state.showAskNameDialog && <AskNameDialog go={api.go} />}
        
		</>
	)
}


