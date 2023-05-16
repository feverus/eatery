import * as I from '~Store/storeInterfaces'

export type UseEditFormTag = (data:I.Tag) => [
    state: {
        data:I.Tag;
    },
    api: {
        handleInputChange: (field: string, value: string) => void;
        handleApprove: I.ControlCallback;  
    }
];