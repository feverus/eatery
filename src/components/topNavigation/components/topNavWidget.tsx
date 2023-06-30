import { Link } from 'react-router-dom'
import { NavbarDivider, NavbarHeading, Icon } from "@blueprintjs/core"
import { WidgetType } from '../topNavigation.props'
import C from './topNavWidget.module.scss'
import setStore from "~Store/setStore"
import { statusClasses } from "~Store/consts"

export function TopNavWidget({ icon, url = '/', title, link, className = false }: WidgetType) {
  return (
    <>
      <NavbarHeading className={className && C[statusClasses[setStore.orderStatus.toString()]]}>
        { icon && <Icon icon={icon} className={C.icon} /> }

        { link ? <Link to={url}>{title}</Link> : title }

      </NavbarHeading>
      <NavbarDivider />
    </>
  )
}