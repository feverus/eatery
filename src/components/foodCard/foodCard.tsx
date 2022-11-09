import {observer, inject} from "mobx-react";

import * as I from '../../store/storeInterfaces';
import useFoodCard from './foodCard.service'
import { Intent, Button, Card, Elevation, Divider, ControlGroup, ButtonGroup } from "@blueprintjs/core";

import C from './foodCard.module.scss'
import Slider from '../slider'


export function FoodCard(item:I.Food) {
    const [state, api] = useFoodCard(item)

    return (    
        <div className={C.card}>
            <Card interactive={true} elevation={Elevation.ZERO} >
                <div className={C.cardName}>
                    <h5>{item.id} - {item.name}</h5>
                    <span>{item.price} руб.</span>
                </div>
                <Divider />
                <Slider images={item.images} />
                <div dangerouslySetInnerHTML={{__html: item.info}} />
                <Divider />
                <ControlGroup fill={false} vertical={false}>
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

                    <ButtonGroup minimal={true}>
                        <Button icon="move">Переместить</Button>
                        <Button icon="duplicate">Дублировать</Button>
                        <Button icon="edit"
                            onClick={() => api.openEditForm(item)}
                        >
                            Редактировать
                        </Button>
                        <Button icon="delete">
                            Удалить
                        </Button>
                    </ButtonGroup>                
                </ControlGroup>
            </Card>
        </div>
        )
}