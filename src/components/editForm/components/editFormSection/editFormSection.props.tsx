import * as I from '~Store/storeInterfaces'
import { DropResult } from "react-beautiful-dnd"

export type UseEditFormSectionApi = {
  handleDelete: (id: string) => void,
  handleApprove: (data: I.Section) => void,
}

export type UseEditFormSection = () => UseEditFormSectionApi;

export type UseDragable = () => [
  dragState: {
    sections: I.Section[];
  },
  dragApi: {
    setState: (newState:I.Section[]) => void;
    onDragEnd: (result: DropResult ) => void;
  }
]

export type SectionItemEditorListType = {
  sections:I.Section[],
  api: UseEditFormSectionApi;
}

export type SectionItemEditorType = {
	id: string;
	api: UseEditFormSectionApi;
}