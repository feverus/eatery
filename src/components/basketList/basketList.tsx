import setStore from '~Store/setStore'
import EditForm from '~Components/editForm'
import SectionHeader from '~Components/sectionHeader/'
import C from './basketList.module.scss'
import { Button } from '@blueprintjs/core'
import useBasketList from './basketList.service'
import { BasketCard } from './components/basketCard'

export function BasketList() {
    const [state, api] = useBasketList()

    return (
        <div className={C.list}>
            {state.basketItems.map(item => 
                <BasketCard {...item} key={'BasketCard' + item.id} />)
            }
        </div>
    )
}