import * as I from '~Store/storeInterfaces'

export type UseEditFormTag = () => [
	state: {
		data: I.Tag[];
		editMode: boolean;
		editedTag: string;
		editableValue: string;
	},
	api: {
		add: (names: string[]) => void;
		remove: (name: string) => void;
		edit: (oldName: string, newName: string) => void;
		onEditMode: (value: string) => void;
		offEditMode: (save: boolean) => void;
		setEditableValue: (value: string) => void;
	}
];

export interface EditableTagProps {
	name: string,
	onEditMode: (value: string) => void,
}