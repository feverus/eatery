import * as I from '../../store/storeInterfaces';
import { EditorState, convertToRaw, ContentState } from "draft-js";

export type UseEditFormFood = (data:I.Food) => [
    state: {
        editorToolbarProps: Object;
        editorState:EditorState;
        data:I.Food,
    },
    api: {
        handleInputChange: (field: string, value: string) => void,
        handleEditorChange: (value: EditorState) => void,    
        handleApprove: () => void,
    }
];