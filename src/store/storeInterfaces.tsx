export type ControlCallback = () => void;

export interface Food {
    id: string;
	name: string;
    section: string;
    price: number;
    images: Array<string>;
    info: string;
}
export interface Section {
    id: string;
	name: string;
    order: number;
}
export interface Tag {
    id: string;
	name: string;
}

export type SomeDataFromApi = Array<Food> |  Array<Section> | Array<Tag> | VersionsItem[];
export type BaseDataFromApi = Exclude<SomeDataFromApi, VersionsItem[]>

export type EditFormFoodData = Food|undefined;

export interface AuthData {
    token: string;
    role: string;
}

export interface OrderData {
    id: string;
    name: string;
    food: Array<string>;
}

export type VersionsItem = {
    name: string;
    version: number;
}