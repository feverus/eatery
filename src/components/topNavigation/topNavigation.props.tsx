import { MaybeElement } from "@blueprintjs/core"
import { BlueprintIcons_16Id } from "@blueprintjs/icons/lib/esm/generated-icons/16px/blueprint-icons-16"

export type StateType = {
    orderWidget: JSX.Element,
    basketWidget: JSX.Element,
    loginButtonText: string,
};

export type ApiType = {
};

export type UseTopNavigation = () => [
    state: StateType,
    api: ApiType
];

export type WidgetType = {
    icon: BlueprintIcons_16Id | MaybeElement,
    url: string,
    title: string,
    className?: boolean,
}