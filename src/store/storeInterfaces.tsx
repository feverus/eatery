export type ControlCallback = () => void;

export interface ItemWithId {
    id: string;
	name: string;
    version: number;
}

export interface Food extends ItemWithId {
    section: string;
    price: number;
    images: Array<string>;
    tags: Array<string>;
    info: string;
}
export interface Section extends ItemWithId {
    position: number;
}
export interface Tag extends ItemWithId {
}

export type VersionsItem = Omit<ItemWithId , 'id'>

export type SomeDataFromApi = Food[] |  Section[] | Tag[] | VersionsItem[]

export type EditFormFoodData = Food | Section | Tag | undefined

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
export interface OrderData extends ItemWithId {
    food: OrderDataItem[];
}

/** сырые данные заказа получаемые от api */
export interface OrderFromApi extends ItemWithId {
    foodid: string[];
    price: number[];
    status: number[];
}


/** сырые данные заказа для отправки к api*/
export interface OrderToApi extends Pick<ItemWithId , 'id' | 'version'> {
    foodid: string[];
    price: number[];
    status: number[];
}