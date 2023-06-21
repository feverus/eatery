import { Intent, Button, Card, Elevation, Divider, ControlGroup, ButtonGroup } from "@blueprintjs/core";
import C from './foodDetail.module.scss'
import { useLoaderData } from 'react-router-dom';
import * as I from '~Store/storeInterfaces'
import setStore from '~Store/setStore'
import menuStore from "~/store/menuStore";
import Slider from '~Components/slider'
import {useFoodCard} from '~Components/foodList'
import EditForm from '~Components/editForm'

type P = {
	item:I.Food
}

export function ShowDetail({item}: P) {    
	const [state, api] = useFoodCard(item.id)
	
	return (
		<div className={C.section}>
			<Card
				interactive={true}
				elevation={Elevation.ZERO}
				className={C.card}
			>
				<div className={C.name}>
					<h5>{item.id} - {item.name}</h5>
					<span>{item.price} руб.</span>
				</div>
				<Divider />
				<Slider images={item.images} />
				<div dangerouslySetInnerHTML={{__html: item.info}} />
				<Divider />
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

			<EditForm />
		</div>
	)
}

export function FoodDetail() {
	const loaderData = useLoaderData()
	const food = menuStore.food.find(food => food.id === loaderData)

	if (food?.id === undefined)
		return <>404</>
	else
		return <ShowDetail item={food} />
}