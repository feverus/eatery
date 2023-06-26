import * as I from '~Store/storeInterfaces';
import { EditorState } from "draft-js";
export interface SectionSelectItem {
    title: string;
    id: string;
    rank: number;
} 
export interface TagSelectItem {
    title: string;
    id: string;
    rank: number;
} 

export interface CategorySelectProps {
    items: SectionSelectItem[];
    selectedId: string;
    onSelect: (field: string, value: string) => void;
}
export interface TagSelectProps {
    items: SectionSelectItem[];
    selectedIds: string[];
    onSelect: (field: string, value: string) => void;
}

export type UseEditFormFood = (data:I.Food) => [
    state: {
        editorToolbarProps: Object;
        editorState: EditorState;
        data: I.Food;
    },
    api: {
        handleInputChange: (field: string, value: string) => void;
        handleEditorChange: (value: EditorState) => void;
        handleApprove: I.ControlCallback;  
    }
];
