export type ControlCallback = () => void;

export interface ItemWithId {
    id: string;
	name: string;
}

export interface Food extends ItemWithId {
    section: string;
    price: number;
    images: Array<string>;
    info: string;
}
export interface Section extends ItemWithId {
    order: number;
}
export interface Tag extends ItemWithId {
}

export interface VersionsItem {
    name: string;
    version: number;
}

export type SomeDataFromApi = Food[] |  Section[] | Tag[] | VersionsItem[];
export type BaseDataFromApi = Exclude<SomeDataFromApi, VersionsItem[]>

export type EditFormFoodData = Food | undefined;

export interface AuthData {
    token: string;
    role: string;
}

export interface OrderDataItem {
    foodid: string,
    price: number,
    status: number,
}

/** данные заказа для хранения в store */
export interface OrderData extends ItemWithId, VersionsItem {
    food: OrderDataItem[];
}

/** сырые данные заказа получаемые от api */
export interface OrderFromApi extends ItemWithId, VersionsItem {
    foodid: string[];
    price: number[];
    status: number[];
}