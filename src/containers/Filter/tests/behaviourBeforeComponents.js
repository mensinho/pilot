import {
  DateInput,
  Input,
  CardSection,
  Button,
  CardActions,
} from 'former-kit'

import {
  createComponents,
  filterOptionsValues,
  getCheckboxGroups,
  getCheckboxes,
  getCheckedCheckboxes,
  newDates,
  newSearchValue,
  selectedFilters,
  toggleCheckboxes,
  toggleFilterOptions,
} from './common'

const changeDateInput = () => {
  const { onChange, getComponent, stateComponent } = createComponents()
  const component = getComponent()
  const dateInput = component.find(DateInput).first()

  dateInput.props().onChange(newDates)

  stateComponent.update()

  return {
    onChange,
    component: getComponent(),
    selectedFilters,
  }
}

const changeSearchInput = () => {
  const { onChange, getComponent, stateComponent } = createComponents()
  const component = getComponent()
  const searchInput = component.find(Input).first()

  searchInput
    .find('input')
    .simulate('change', {
      target: {
        value: newSearchValue,
      },
    })

  stateComponent.update()

  return {
    onChange,
    component: getComponent(),
    selectedFilters,
  }
}

const changeCheckboxes = ({ getComponent, stateComponent, onChange }) => {
  let component = getComponent()
  // expand filters section
  toggleFilterOptions(stateComponent)

  getCheckboxes(stateComponent).forEach(toggleCheckboxes(filterOptionsValues))

  const finalSelectedChecks = getCheckedCheckboxes(stateComponent)


  finalSelectedChecks.map(node => node.props().value)

  // collapse filters section
  toggleFilterOptions(component)

  stateComponent.update()

  return {
    onChange,
    component: getComponent(),
    selectedFilters: finalSelectedChecks,
  }
}

const checkAllCheckboxes = () =>
  changeCheckboxes(createComponents({ values: [] }))

const uncheckAllCheckboxes = () =>
  changeCheckboxes(createComponents({
    values: filterOptionsValues,
  }))

const changeAllFilters = () => {
  const {
    onChange,
    getComponent,
    stateComponent,
  } = createComponents()
  const component = getComponent()

  const clearButton = component
    .find(CardActions)
    .findWhere(node => node.is(Button) && node.props().type !== 'submit')

  clearButton.simulate('click')

  const defaultProps = getComponent().props()

  // expand filters section
  toggleFilterOptions(stateComponent)

  const checkboxGroups = getCheckboxGroups(stateComponent)

  const checkedFiltersValues = checkboxGroups
    .map(node => node
      .find('input')
      .first()
      .simulate('change')
      .props()
      .value
    )

  const searchInput = component.find(Input).first()
  searchInput
    .find('input')
    .simulate('change', {
      target: {
        value: newSearchValue,
      },
    })
  const dateInput = component.find(DateInput).first()
  dateInput.props().onChange(newDates)

  // colapse filters section
  toggleFilterOptions(stateComponent)

  stateComponent.update()

  return {
    onChange,
    component: getComponent(),
    clearButton,
    defaultProps,
    checkboxGroups,
    selectedFilters: checkedFiltersValues,
    searchInput,
    dateInput,
  }
}

export {
  checkAllCheckboxes,
  uncheckAllCheckboxes,
  changeDateInput,
  changeSearchInput,
  changeAllFilters,
}
