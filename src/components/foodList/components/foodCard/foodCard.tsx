import * as I from '~Store/storeInterfaces'
import setStore from '~Store/setStore'
import {useFoodCard} from './foodCard.service'
import { Intent, Button, Card, Elevation, ControlGroup, ButtonGroup } from "@blueprintjs/core";
import C from './foodCard.module.scss'
import {Link} from 'react-router-dom'

export function FoodCard(item:I.Food) {
	const [state, api] = useFoodCard(item.id)

	return (
		<div className={C.section}>
			
			<Card
				interactive={false}
				elevation={Elevation.ZERO}
				className={C.card}
			>
				<Link to = {`food/${item.id}`}>
					<div className={C.name}>
						<h5>{item.name}</h5>
						<span>{item.price} руб.</span>
					</div>
				</Link>

				<Link to = {`food/${item.id}`}>
					{item.images.length > 0 && <img src={item.images[0]}/>}
				</Link>

				<ControlGroup fill={false} vertical={false} className={C.footerButtons}>

					{setStore.role=='client' && 
					<>
					<Button 
						icon="remove"
						intent={Intent.DANGER}
						minimal
						onClick={api.remove}
					></Button>
					<input type="text"
						value={state.count.toString()}
						disabled
						className={C.inputCount}/>
					<Button
						icon="add"
						intent={Intent.SUCCESS}
						minimal
						onClick={api.add}
					></Button>
					</>
					}

					{setStore.role=='admin' && 
					<ButtonGroup minimal={true}>
						<Button icon="edit"
							onClick={api.openEditForm}
						>
							Редактировать
						</Button>
						<Button icon="delete"
							onClick={api.handleDelete}
						>
							Удалить
						</Button>
					</ButtonGroup>
					}      
							 
				</ControlGroup>
			</Card>
		</div>
	)
}