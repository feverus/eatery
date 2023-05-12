import * as I from '~Store/storeInterfaces'
import setStore from '~Store/setStore'
import {useFoodCard} from './foodCard.service'
import { Intent, Button, Card, Elevation, Divider, ControlGroup, ButtonGroup } from "@blueprintjs/core";
import C from './foodCard.module.scss'
import Slider from '~Components/slider'

export function FoodCard(item:I.Food) {
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
        </div>
    )
}