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
export type EditFormFoodData = Food|undefined;