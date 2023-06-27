import { observer} from "mobx-react"
import { Card, Elevation, Icon, ButtonGroup } from "@blueprintjs/core"
import C from './basketList.module.scss'
import useBasketList from './basketList.service'
import { BasketCard } from './components/basketCard'
import { Button } from '@blueprintjs/core'
import { CreditCard } from "@blueprintjs/icons"

function BasketList() {
	const [state, api] = useBasketList()

	return (
		<div className={C.list}>
			{state.basketItems.length > 0 &&
				<Card
					className={C.block}
					elevation={4}
				>
					<Button
						onClick={api.pushBasketToServer}
						className={C.pushBasketToServer}
					>
						Добавить к заказу
					</Button>

					{state.basketItems.map(item => 
						<BasketCard item={item} key={'BasketCard' + item.id} />)
					}
				</Card>
			}			

			{state.orderItems.length > 0 &&
				<Card
					className={C.block}
					elevation={4}
				>
					<h3>Заказ</h3>
					{state.orderItems.map(item => 
						<BasketCard item={item} withButtons={false} key={'OrderCard' + item.id + item.status + item.price} />)
					}
				</Card>
			}
		</div>
	)
}

export default
	(observer(BasketList))