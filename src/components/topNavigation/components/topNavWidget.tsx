import { Link } from 'react-router-dom';
import { NavbarDivider, NavbarHeading, Icon } from "@blueprintjs/core";
import { WidgetType } from '../topNavigation.props';

export function TopNavWidget({ icon, url, title }: WidgetType) {
  return (
    <>
      <NavbarHeading>
        <Icon icon={icon} />
        <Link to={url}>{title}</Link>
      </NavbarHeading>
      <NavbarDivider />
    </>
  );
}
