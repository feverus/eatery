import * as I from '../../store/storeInterfaces';
import useFoodCard from './hook'

import { Intent, Button, Card, Elevation, Divider, ControlGroup, ButtonGroup } from "@blueprintjs/core";

import C from '../../styles/foodCard.module.css'
import Slider from './slider'

const FoodCard = (item:I.Food) => {
    const [state, api] = useFoodCard()
    return (    
        <div className={C.card}>
            <Card interactive={true} elevation={Elevation.TWO} >
                <div className={C.cardName}>
                    <h5>{item.id} - {item.name}</h5>
                    <span>{item.price} руб.</span>
                </div>
                <Divider />
                <Slider images={item.images} />
                <Divider />
                <ControlGroup fill={false} vertical={false}>
                    <Button icon="remove" intent={Intent.DANGER} minimal
                    onClick={api.remove}></Button>
                    <input type="text" value={state.count.toString()} disabled className={C.inputCount}/>
                    <Button icon="add" intent={Intent.SUCCESS}minimal
                    onClick={api.add}></Button>

                    <ButtonGroup minimal={true}>
                        <Button icon="move">Переместить</Button>
                        <Button icon="duplicate">Дублировать</Button>
                        <Button icon="edit">Редактировать</Button>
                        <Button icon="delete">Удалить</Button>
                    </ButtonGroup>                
                </ControlGroup>
            </Card>
        </div>
        )
}

export default FoodCard