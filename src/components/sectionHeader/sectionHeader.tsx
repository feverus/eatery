import { Card, Elevation} from "@blueprintjs/core"
import C from './sectionHeader.module.scss'
import { P } from './sectionHeader.props'

export function SectionHeader(props:P) {
    return (    
        <div className={C.section}>
            <Card elevation={Elevation.TWO} className={C.card}>
                <div className={C.cardName}>
                    <h5>{props.item}</h5>
                </div>
            </Card>
        </div>
    )
}