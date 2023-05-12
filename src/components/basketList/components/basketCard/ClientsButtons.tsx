import { Intent, Button } from "@blueprintjs/core";
import * as I from '~Store/storeInterfaces'
import C from './basketCard.module.scss'

type P = {
  count: number,
  add: I.ControlCallback,
  remove: I.ControlCallback,
  removeAll: I.ControlCallback,
}

export function ClientsButtons(props: P) {
  console.log(props)
  return (
    <>
      <Button
        icon="trash"
        intent={Intent.DANGER}
        minimal
        onClick={props.removeAll}
      ></Button>
      
      {(props.count > 1) ? 
      <Button
        icon="remove"
        intent={Intent.DANGER}
        minimal
        onClick={props.remove}
      ></Button>
      :
      <span className={C.buttonSpace}/>}

      <Button
        icon="add"
        intent={Intent.SUCCESS}
        minimal
        onClick={props.add}
      ></Button>
    </>
  );
}
