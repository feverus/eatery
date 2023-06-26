import * as I from '~Store/storeInterfaces';

export type UseFilterPanel = () => [
    state: {
        showFilter: boolean,
    },
    api: {
        toggleShowFilter: () => void,
        handleGoodTagsChange: (field: string, value: string) => void,
        handlBadTagsChange: (field: string, value: string) => void,
        handleSearchChange: (value: string) => void,
    }
];