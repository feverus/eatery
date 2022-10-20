import {observer, inject} from "mobx-react";
import editFormStore from "../../store/editFormStore"
import * as I from '../../store/storeInterfaces';
import C from '../../styles/editForm.module.css'

import { Button, Classes, Overlay, Card, Divider, ControlGroup, ButtonGroup, InputGroup, FormGroup } from "@blueprintjs/core";
import { stringify } from "querystring";

const EditFormFood = () => {
    console.log('EditFormFood-')
    console.log(editFormStore.data)

    let data = editFormStore.data as I.Food

    return (
        <Overlay isOpen={true}
            className={Classes.OVERLAY_SCROLL_CONTAINER}
            onClose={()=>editFormStore.closeForm()}
            >
            <Card className={C.card}>
                <InputGroup id="text-input" placeholder="Название блюда" value={data.name} onChange={(e)=>editFormStore.setData({...data, name:e.target.value})} />
                
                <Divider />
                <ControlGroup fill={false} vertical={false}>
                    <ButtonGroup minimal={true}>
                        <Button icon="cloud-upload">Сохранить</Button>
                        <Button icon="eraser" onClick={()=>editFormStore.closeForm()}>Закрыть</Button>
                    </ButtonGroup>  
                </ControlGroup>
            </Card>
            
        </Overlay>
    )
}

export default
	inject('editFormStore')
	(observer(EditFormFood));