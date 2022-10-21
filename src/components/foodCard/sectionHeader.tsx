import { Card, Elevation} from "@blueprintjs/core";

import C from '../../styles/foodCard.module.css'

type P = {
    item:string
}
const SectionHeader = (props:P) => {
    return (    
        <div className={C.section}>
            <Card elevation={Elevation.TWO}  className={C.sectionCard}>
                <div className={C.cardName}>
                    <h5>{props.item}</h5>
                </div>
            </Card>
        </div>
    )
}


export default SectionHeader
