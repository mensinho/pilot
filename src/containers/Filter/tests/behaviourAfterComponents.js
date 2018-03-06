import {
  DateInput,
  Input,
  Button,
  CardActions,
} from 'former-kit'

import {
  togglableFilters,
  selectedFilters,
  createComponents,
  newDates,
  newSearchValue,
  toggleCheckboxes,
  toggleFilterOptions,
  getCheckedCheckboxes,
  getCheckboxGroups,
  getCheckboxes,
} from './common'

const clearButtonEvent = () => {
  const {
    onChange,
    getComponent,
  } = createComponents({ dates: newDates })

  const component = getComponent()

  const clearButton = component
    .find(CardActions)
    .findWhere(node => node.is(Button) && node.props().type !== 'submit')
    .first()

  const defaultProps = {
    dates: newDates,
    values: [],
    search: '',
  }

  clearButton.simulate('click')

  return {
    onChange,
    component: getComponent(),
    clearButton,
    defaultProps,
  }
}

const submitDateInput = () => {
  const { onChange, getComponent } = createComponents()
  const component = getComponent()
  const dateInput = component.find(DateInput).first()

  dateInput.props().onChange(newDates)
  component
    .find('form')
    .simulate('submit')

  return {
    onChange,
    component: getComponent(),
    dateInput,
    selectedFilters,
  }
}

const submitWithSearchInput = () => {
  const { onChange, component } = createComponents()
  const searchInput = component.find(Input).first()

  searchInput
    .find('input')
    .simulate('change', {
      target: {
        value: newSearchValue,
      },
    })

  component
    .find('form')
    .simulate('submit')

  return {
    onChange,
    component,
    searchInput,
    selectedFilters,
  }
}

const submitWithAddedCheckboxGroup = () => {
  const { onChange, component } = createComponents({
    values: [],
  })

  // expand filters section
  toggleFilterOptions(component)

  const checkboxes = getCheckboxes(component)

  checkboxes.forEach(toggleCheckboxes(selectedFilters))

  const selectedFiltersValues = Array.from(checkboxes)
    .filter(node => node.props.checked)
    .map(node => node.props.value)

  // colapse filters section
  toggleFilterOptions(component)

  component
    .find('form')
    .simulate('submit')

  return {
    onChange,
    component,
    selectedFilters: selectedFiltersValues,
  }
}

const submitWithRemovedCheckboxes = () => {
  const {
    onChange,
    component,
  } = createComponents()

  // expand filters section
  toggleFilterOptions(component)

  const initialSelectedChecks = getCheckedCheckboxes(component)

  initialSelectedChecks.forEach(toggleCheckboxes(togglableFilters))

  const finalSelectedChecks = getCheckedCheckboxes(component)

  component
    .find('form')
    .simulate('submit')

  const selectedFiltersValues = finalSelectedChecks.map(filter =>
    filter.props().value
  )

  return {
    onChange,
    component,
    initialSelectedChecks,
    selectedFilters: selectedFiltersValues,
  }
}

const submitWithAll = () => {
  const {
    onChange,
    component,
  } = createComponents()

  const clearButton = component
    .find(CardActions)
    .findWhere(node => node.is('button') && node.props().type !== 'submit')

  clearButton.simulate('click')

  const defaultProps = component.props()

  // expand filters section
  toggleFilterOptions(component)

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
  toggleFilterOptions(component)

  component
    .find('form')
    .simulate('submit')

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
  clearButtonEvent,
  submitDateInput,
  submitWithSearchInput,
  submitWithAddedCheckboxGroup,
  submitWithRemovedCheckboxes,
  submitWithAll,
}
