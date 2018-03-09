import {
  apply,
  applySpec,
  eqBy,
  flatten,
  head,
  innerJoin,
  isEmpty,
  keys,
  last,
  map,
  not,
  objOf,
  pipe,
  prop,
  values,
} from 'ramda'

// compileTags(options, values)
const compileTags = pipe(
  Array.of,
  applySpec([
    pipe(
      head,
      map(prop('items')),
      flatten
    ),
    pipe(
      last,
      flatten,
      map(objOf('value'))
    ),
  ]),
  apply(innerJoin(eqBy(prop('value'))))
)

const hasKeys = pipe(keys, isEmpty, not)

const getValues = pipe(values, flatten)

export {
  compileTags,
  getValues,
  hasKeys,
}
