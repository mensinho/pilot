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
      values,
      flatten,
      map(objOf('value'))
    ),
  ]),
  apply(innerJoin(eqBy(prop('value'))))
)

const hasTags = pipe(keys, isEmpty, not)

export { hasTags }
export default compileTags
