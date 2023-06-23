import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRendererProps, MultiSelect } from "@blueprintjs/select";
import C from '../editFormFood.module.scss';
import { SectionSelectItem, TagSelectItem, TagSelectProps } from '../editFormFood.props';
import { useEffect, useState } from 'react';

const renderTag = (item: TagSelectItem, { handleClick, handleFocus, modifiers, query }: ItemRendererProps<HTMLLIElement>, selected: boolean) => {
	return (
		<MenuItem
			key={'renderTag' + item.rank}
			onClick={handleClick}
			onFocus={handleFocus}
			text={item.title}
			selected={selected}
			roleStructure={"listoption"}
		/>
	)
}

export const filterTag:ItemPredicate<TagSelectItem> = (query, tag, _index, exactMatch) => {
	const normalizedTitle = tag.title.toLowerCase()
	const normalizedQuery = query.toLowerCase()

	if (exactMatch) {
			return normalizedTitle === normalizedQuery;
	} else {
			return tag.title.indexOf(normalizedQuery) >= 0;
	}
}

export const TagSelect = (props: TagSelectProps) => {
	const { items, selectedIds, onSelect } = props
	const [selected, setSelected] = useState<SectionSelectItem[]>([])

	useEffect(() => {
		if (items.length > 0 && selectedIds.length > 0)
				setSelected(items.filter(item => selectedIds.includes(item.id)))
	}, [items, selectedIds])

	return (
		<MultiSelect<TagSelectItem>
			items={items}
			selectedItems={selected}
			fill={true}
			itemRenderer={(item, props) => renderTag(item, props, !!selected.find(s => s.id === item.id))}
			noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
			onItemSelect={item => onSelect('tag', item.id)}
			onRemove={item => onSelect('tag', item.id)}
			itemPredicate={filterTag}
			tagRenderer={item => item.title}
			placeholder='Выбор тэгов'
			popoverProps={{ matchTargetWidth:true, position:'top' }}
			className={C.select}
		/>
	)
}