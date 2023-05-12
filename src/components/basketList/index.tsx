import { observer} from "mobx-react";
import { BasketList } from './basketList'

export type { BasketListItem } from './basketList.props'
export default
	(observer(BasketList));