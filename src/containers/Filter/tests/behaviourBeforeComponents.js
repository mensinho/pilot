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
  const { onChange, component } = createComponents()
  const dateInput = component.find(DateInput).first()

  dateInput.props().onChange(newDates)

  return {
    onChange,
    component,
    selectedFilters,
  }
}

const changeSearchInput = () => {
  const { onChange, component } = createComponents()
  const searchInput = component.find(Input).first()

  searchInput
    .find('input')
    .simulate('change', {
      target: {
        value: newSearchValue,
      },
    })

  return {
    onChange,
    component,
    selectedFilters,
  }
}

const changeCheckboxes = ({ component, onChange }) => {
  // expand filters section
  toggleFilterOptions(component)

  getCheckboxes(component).forEach(toggleCheckboxes(filterOptionsValues))

  const finalSelectedChecks = getCheckedCheckboxes(component)
    .map(node => node.props().value)

  // collapse filters section
  toggleFilterOptions(component)

  return {
    onChange,
    component,
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
    component,
  } = createComponents()

  const clearButton = component
    .find(CardActions)
    .findWhere(node => node.is(Button) && node.props().type !== 'submit')
  clearButton.simulate('click')
  const defaultProps = component.props()

  // expand filters section
  component
    .find(CardSection)
    .find('[role="button"]')
    .simulate('click')
  const checkboxGroups = getCheckboxGroups(component)
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
  component
    .find(CardSection)
    .find('[role="button"]')
    .simulate('click')

  return {
    onChange,
    component,
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
