import { Card, Elevation, Icon, ButtonGroup } from "@blueprintjs/core"
import setStore from "~/store/setStore"
import C from './basketCard.module.scss'
import { BasketListItem } from "~Components/basketList"
import {useFoodCard} from "~Components/foodList"
import { ClientsButtons } from "./ClientsButtons"

export function BasketCard(item:BasketListItem) {
  const [foodCardState, foodCardApi] = useFoodCard(item.id)
  const priceString:JSX.Element = (item.oldPrice === undefined) ?
    <>{item.price}</>
    :
    <><u>{item.oldPrice}</u> {item.price}</>

  return (
    <div className={C.section}>
      <Card
        interactive={false}
        elevation={Elevation.ZERO}
        className={C.card}
      >          
        <h5>{item.name}</h5>
        <span className={C.price}>
          <Icon icon={'dollar'} /> {priceString}
        </span>                
        <span className={C.count}>
          <Icon icon={'multi-select'} /> {item.count}
        </span>
        
        <ButtonGroup>
          {setStore.role=='client' && <ClientsButtons count={item.count} add={foodCardApi.add} remove={foodCardApi.remove} removeAll={foodCardApi.removeAll} />}
        </ButtonGroup>
      </Card>
    </div>
  )
}