import { Card, Elevation, Icon, ButtonGroup } from "@blueprintjs/core"
import setStore from "~Store/setStore"
import { statusClasses } from "~Store/consts"
import C from './basketCard.module.scss'
import {useFoodCard} from "~Components/foodList"
import { BasketListItem } from "~Components/basketList"
import { ClientsButtons } from "./ClientsButtons"

type P = {
  item:BasketListItem,
  withButtons?:boolean,
}

export function BasketCard({item, withButtons = true}:P) {
  const [foodCardState, foodCardApi] = useFoodCard(item.id)
  const priceString:JSX.Element = (item.oldPrice === item.price) ?
    <>{item.price}</>
    :
    <><s>{item.oldPrice}</s> {item.price}</>

  return (
    <div className={C.section}>
      <Card
        interactive={false}
        elevation={Elevation.ZERO}
        className={C.card + ' ' + C[statusClasses[item.status.toString()]]}
      >          
        <h5>{item.name}</h5>
        <div className={C.data}>
          <span className={C.price}>
            <Icon icon={'dollar'} /> {priceString}
          </span>                
          <span className={C.count}>
            <Icon icon={'multi-select'} /> {item.count}
          </span>

          {withButtons &&
            <ButtonGroup>
              {setStore.role=='client' && <ClientsButtons count={item.count} add={foodCardApi.add} remove={foodCardApi.remove} removeAll={foodCardApi.removeAll} />}
            </ButtonGroup>
          }
        </div>        
      </Card>
    </div>
  )
}