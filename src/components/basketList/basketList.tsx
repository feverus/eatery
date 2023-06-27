import { observer} from "mobx-react"
import C from './basketList.module.scss'
import useBasketList from './basketList.service'
import { BasketCard } from './components/basketCard'
import { Button } from '@blueprintjs/core'

function BasketList() {
	const [state, api] = useBasketList()

	return (
		<div className={C.list}>
			{state.basketItems.length > 0 &&
				<Button
					onClick={api.pushBasketToServer}	
				>
					Добавить к заказу
				</Button>
			}

			{state.basketItems.map(item => 
				<BasketCard item={item} key={'BasketCard' + item.id} />)
			}
			{state.orderItems.map(item => 
				<BasketCard item={item} withButtons={false} key={'OrderCard' + item.id + item.status + item.price} />)
			}
		</div>
	)
}

export default
	(observer(BasketList))