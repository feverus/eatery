import { Button, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select } from "@blueprintjs/select";
import C from '../editFormFood.module.scss';
import { SectionSelectItem, CategorySelectProps } from '../editFormFood.props';
import { useEffect, useState } from 'react';

const renderSections: ItemRenderer<SectionSelectItem> = (item, { handleClick, handleFocus, modifiers, query }) => {
	return (
		<MenuItem
			active={modifiers.active}
			disabled={modifiers.disabled}
			key={'renderSections' + item.rank}
			onClick={handleClick}
			onFocus={handleFocus}
			roleStructure="listoption"
			text={item.title} 
		/>
	)
}

export const CategorySelect = (props: CategorySelectProps) => {
	const { items, selectedId, onSelect } = props;
	const [selected, setSelected] = useState<SectionSelectItem | undefined>();

	useEffect(() => {
		if (items.length > 0)
			if (selectedId === '')
				setSelected(items[0]);
			else {
				setSelected(items.find(item => item.id === selectedId));
				onSelect('section', selectedId);
			}
	}, [items])

	return (
		<Select<SectionSelectItem>
			items={items}
			activeItem={selected}
			fill={true}
			filterable={false}
			itemRenderer={renderSections}
			noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
			onItemSelect={setSelected}
			onActiveItemChange={(item) => onSelect('section', item?.id ?? '')}
			popoverProps={{ matchTargetWidth: true }}
			className={C.select}
		>
			<Button
				text={selected?.title}
				rightIcon="double-caret-vertical"
				placeholder="Выбрать категорию"
				className={C.button} />
		</Select>
	)
}