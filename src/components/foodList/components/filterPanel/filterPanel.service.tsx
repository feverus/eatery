import { useState } from 'react'
import setStore from '~Store/setStore'
import { UseFilterPanel } from "./filterPanel.props"

const useFilterPanel:UseFilterPanel = () => {
	const [showFilter, setShowFilter] = useState(false)
	
	const toggleShowFilter = () => {
		setShowFilter(!showFilter)
	}

	const handleGoodTagsChange = (field: string, value: string) => {
		const finded = setStore.goodTags.find(id => id === value)
		const newTags = (finded === undefined) ?
			[...setStore.goodTags, value]
			:
			setStore.goodTags.filter(t => t !== value)
		setStore.setFilters('goodTags', newTags)
	}

	const handlBadTagsChange = (field: string, value: string) => {
		const finded = setStore.badTags.find(id => id === value)
		const newTags = (finded === undefined) ?
			[...setStore.badTags, value]
			:
			setStore.badTags.filter(t => t !== value)
		setStore.setFilters('badTags', newTags)
	}

	/** TODO задержку ввода */
	const handleSearchChange = (value: string) => {
		setStore.setFilters('searchPrompt', value)
	}

	const state = {
		showFilter,
	}
	const api = {
		toggleShowFilter,
		handleGoodTagsChange,
		handlBadTagsChange,
		handleSearchChange,
	}
	
	return (
		[state, api]
	)
}

export default useFilterPanel