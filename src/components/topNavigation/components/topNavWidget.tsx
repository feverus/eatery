import { Link } from 'react-router-dom';
import { NavbarDivider, NavbarHeading, Icon } from "@blueprintjs/core";
import { WidgetType } from '../topNavigation.props';
import C from './topNavWidget.module.scss'

export function TopNavWidget({ icon, url, title, className='clear' }: WidgetType) {
  return (
    <>
      <NavbarHeading className={C[className]}>
        <Icon icon={icon} />
        <Link to={url}>{title}</Link>
      </NavbarHeading>
      <NavbarDivider />
    </>
  );
}
