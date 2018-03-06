import {
  clearButtonEvent,
  submitDateInput,
  submitWithSearchInput,
  submitWithAddedCheckboxGroup,
  submitWithRemovedCheckboxes,
  submitWithAll,
} from './behaviourAfterComponents'

import {
  selectedFilters,
  datesDefault,
  searchValue,
  newDates,
  newSearchValue,
  finalSelectedFilters,
} from './common'

const afterClear = {
  getSearchInputCase: () => [
    {
      name: 'when the filters are cleared',
      ...clearButtonEvent(),
      expectedSearchValue: '',
    },
  ],
  getDateInputCase: () => [
    {
      name: 'when the filters are cleared',
      ...clearButtonEvent(),
      dates: newDates,
    },
  ],
  getSelectedCheckboxesCase: () => [
    {
      name: 'when the filters are cleared',
      ...clearButtonEvent(),
      selectedFilters: [],
    },
  ],
  getOnChangeCase: () => [
    {
      name: 'when the filters are cleared',
      ...clearButtonEvent(),
    },
  ],
}

const afterSubmit = {
  getSubmitButtonDisabledCase: () => [
    {
      name: 'when DateInput changes and the form is submited',
      ...submitDateInput(),
      expectedButtonDisabledState: true,
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithSearchInput(),
      expectedButtonDisabledState: true,
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithAddedCheckboxGroup(),
      expectedButtonDisabledState: true,
    },
    {
      name: 'when checkboxes are unchecked and the form is submited',
      ...submitWithRemovedCheckboxes(),
      expectedButtonDisabledState: true,
    },
    {
      name: 'when all values are changed and the form is submited',
      ...submitWithAll(),
      expectedButtonDisabledState: true,
    },
  ],

  getSubmitButtonRelevanceCase: () => [
    {
      name: 'when DateInput changes and the form is submited',
      ...submitDateInput(),
      buttonRelevance: 'low',
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithSearchInput(),
      buttonRelevance: 'low',
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithAddedCheckboxGroup(),
      buttonRelevance: 'low',
    },
    {
      name: 'when checkboxes are unchecked and the form is submited',
      ...submitWithRemovedCheckboxes(),
      buttonRelevance: 'low',
    },
    {
      name: 'when all values are changed and the form is submited',
      ...submitWithAll(),
      buttonRelevance: 'low',
    },
  ],

  getResetButtonRelevanceCase: () => [
    {
      name: 'when DateInput changes and the form is submited',
      ...submitDateInput(),
      buttonRelevance: 'low',
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithSearchInput(),
      buttonRelevance: 'low',
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithAddedCheckboxGroup(),
      buttonRelevance: 'low',
    },
    {
      name: 'when checkboxes are unchecked and the form is submited',
      ...submitWithRemovedCheckboxes(),
      buttonRelevance: 'low',
    },
    {
      name: 'when all values are changed and the form is submited',
      ...submitWithAll(),
      buttonRelevance: 'low',
    },
  ],

  getCorrectTagCase: () => [
    {
      name: 'when DateInput changes and the form is submited',
      ...submitDateInput(),
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithSearchInput(),
    },
    {
      name: 'when chekboxes are checked and the form is submited',
      ...submitWithAddedCheckboxGroup(),
    },
    {
      name: 'when checkboxes are unchecked and the form is submited',
      ...submitWithRemovedCheckboxes(),
    },
    {
      name: 'when all values are changed and the form is submited',
      ...submitWithAll(),
    },
  ],

  getDateInputDatesCase: () => [
    {
      name: 'when DateInput changes and the form is submited',
      ...submitDateInput(),
      dates: newDates,
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithSearchInput(),
      dates: datesDefault,
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithAddedCheckboxGroup(),
      dates: datesDefault,
    },
    {
      name: 'when checkboxes are unchecked and the form is submited',
      ...submitWithRemovedCheckboxes(),
      dates: datesDefault,
    },
    {
      name: 'when all values are changed and the form is submited',
      ...submitWithAll(),
      dates: newDates,
    },
  ],

  getSearchInputSearchCase: () => [
    {
      name: 'when DateInput changes and the form is submited',
      ...submitDateInput(),
      searchValue,
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithSearchInput(),
      searchValue: newSearchValue,
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithAddedCheckboxGroup(),
      searchValue,
    },
    {
      name: 'when checkboxes are unchecked and the form is submited',
      ...submitWithRemovedCheckboxes(),
      searchValue,
    },
    {
      name: 'when all values are changed and the form is submited',
      ...submitWithAll(),
      searchValue: newSearchValue,
    },
  ],

  getOnChangeCase: () => [
    {
      name: 'when DateInput changes and the form is submited',
      ...submitDateInput(),
      search: searchValue,
      dates: newDates,
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithSearchInput(),
      values: selectedFilters,
      search: newSearchValue,
      dates: datesDefault,
    },
    {
      name: 'when search input changes and the form is submited',
      ...submitWithAddedCheckboxGroup(),
      search: searchValue,
      dates: datesDefault,
    },
    {
      name: 'when checkboxes are unchecked and the form is submited',
      ...submitWithRemovedCheckboxes(),
      values: finalSelectedFilters,
      search: searchValue,
      dates: datesDefault,
    },
    {
      name: 'when all values are changed and the form is submited',
      ...submitWithAll(),
      dates: newDates,
      search: newSearchValue,
    },
  ],
}

export {
  afterClear,
  afterSubmit,
}
