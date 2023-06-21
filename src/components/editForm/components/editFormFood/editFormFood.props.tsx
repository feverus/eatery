import * as I from '~Store/storeInterfaces';
import { EditorState } from "draft-js";
export interface SectionSelectItem {
    title: string;
    id: string;
    rank: number;
} 

export type UseEditFormFood = (data:I.Food) => [
    state: {
        editorToolbarProps: Object;
        editorState:EditorState;
        data:I.Food;
        sections:SectionSelectItem[];
    },
    api: {
        handleInputChange: (field: string, value: string) => void;
        handleEditorChange: (value: EditorState) => void;
        handleApprove: I.ControlCallback;  
    }
];

export interface CategorySelectProps {
    items: SectionSelectItem[];
    selectedId: string;
    onSelect: (field: string, value: string) => void;
}