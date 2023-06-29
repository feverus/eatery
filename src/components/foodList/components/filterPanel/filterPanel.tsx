import { Button, Collapse, ControlGroup, Label, HTMLSelect, Switch, InputGroup, Card } from '@blueprintjs/core'
import setStore from '~/store/setStore'
import { TagSelect, useTags } from '~Components/editForm'
import C from './filterPanel.module.scss'
import useFilterPanel from './filterPanel.service'

const sortSelectOptions = [
  {label: 'Без сортировки', value: ''},
  {label: 'По алфавиту', value: 'abc'},
  {label: 'По стоимости', value: 'price'},
]

const FilterPanel = () => {
  const [state, api] = useFilterPanel()
  const tags = useTags()

  const SortBlock = 
    <ControlGroup
      fill={true}
      vertical={true}
      className={C.group}
    >
      <Label>
        Сортировка
      </Label>

      <HTMLSelect
        options={sortSelectOptions}
        onChange={(e) => setStore.setSortType(e.target.value)} />

      <Switch
        checked={setStore.sortDirection}
        innerLabel="По возрастанию"
        innerLabelChecked="По убыванию"
        onChange={() => setStore.toogleSortDirection()}
      />
    </ControlGroup>

  const SearchBlock = 
    <ControlGroup
      fill={true}
      vertical={true}
      className={C.group}
    >
      <Label>
        Поиск
      </Label>

      <InputGroup
        leftIcon="search"
        onChange={(e) => api.handleSearchChange(e.target.value)}
        placeholder="Строка поиска..."
        value={setStore.searchPrompt}
        fill={true}
      />

    </ControlGroup>

  const TagsBlock = 
    <ControlGroup
      fill={true}
      vertical={true}
      className={C.group}
    >
      <Label>
        Искать только с этими тэгами
      </Label>

      <TagSelect
        items={tags}
        selectedIds={setStore.goodTags}
        onSelect={api.handleGoodTagsChange}
      />

      <Label>
        Исключить эти тэги
      </Label>

      <TagSelect
        items={tags}
        selectedIds={setStore.badTags}
        onSelect={api.handlBadTagsChange}
      />

    </ControlGroup>

  const ResetBlock = 
    <ControlGroup
      fill={true}
      vertical={true}
      className={C.group}
    >
      <Button onClick={() => setStore.setFilters('clear')}>
        Сброс
      </Button>

    </ControlGroup>

  return (
    <div className={C.filter}>
      <Button
        icon="filter-open"
        onClick={api.toggleShowFilter}
      >
        {state.showFilter ? "Скрыть" : "Показать"} фильтр
      </Button>
      <Collapse isOpen={state.showFilter}>
        <Card
          className={C.form}
        >
          {SortBlock}

          {SearchBlock}

          {TagsBlock}

          {ResetBlock}
        </Card>
      </Collapse>
    </div>
  )
}

export default FilterPanel