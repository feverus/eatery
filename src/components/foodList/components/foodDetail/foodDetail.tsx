import { Intent, Button, Card, Elevation, Divider, ControlGroup, ButtonGroup, TagInput } from "@blueprintjs/core";
import C from './foodDetail.module.scss'
import { useLoaderData } from 'react-router-dom'
import * as I from '~Store/storeInterfaces'
import setStore from '~Store/setStore'
import menuStore from "~Store/menuStore"
import Slider from '~Components/slider'
import { EditForm } from '~Components/editForm'
import { useFoodCard } from '~Components/foodList'
import { useEffect } from "react";

type P = {
	item:I.Food
}

export function ShowDetail({item}: P) {    
	const [state, api] = useFoodCard(item.id)
	
	useEffect(() => {
		setStore.setPage(item.name)
	}, [])
	
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

				<TagInput
					fill={true}
					addOnBlur={true}
					addOnPaste={true}
					className={C.tagInput}
					leftIcon={"tag"}
					placeholder="Пустой список тэгов"
					values={item.tags.map(id => menuStore.tag.find(tag => tag.id === id)?.name)}
					disabled
        />

				<Divider />
				<ControlGroup fill={false} vertical={false} className={C.footerButtons}>

					{setStore.role === 'client' && 
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

					{setStore.role === 'admin' && 
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