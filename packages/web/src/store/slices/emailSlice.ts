import { Action, createAction, createReducer, on } from '@ngrx/store'
import cloneDeep from 'lodash.clonedeep'
import { Email } from '../types'

export interface EmailState {
  emailLoading: boolean
  email: Array<Email> | undefined
  emailTotal: number
}
const initialState: EmailState = {
  emailLoading: false,
  email: undefined,
  emailTotal: 0,
}

// Actions
export const setEmailLoading = createAction(
  'setEmailLoading',
  (emailLoading: boolean) => ({
    emailLoading,
  })
)
export const setEmail = createAction(
  'setEmail',
  (email: Array<Email> | undefined) => ({
    email,
  })
)
export const appendEmail = createAction(
  'appendEmail',
  (email: Array<Email> | undefined) => ({
    email,
  })
)
export const setEmailTotal = createAction(
  'setEmailLoading',
  (emailTotal: number) => ({
    emailTotal,
  })
)

// Reducer
export function emailReducer(
  state: EmailState | undefined,
  action: Action
): EmailState {
  const reducer = createReducer(
    initialState,
    on(setEmailLoading, (state, val) => {
      const s = cloneDeep(state)
      s.emailLoading = val.emailLoading
      return s
    }),
    on(setEmail, (state, val) => {
      const s = cloneDeep(state)
      s.email = val.email
      return s
    }),
    on(appendEmail, (state, val) => {
      const s = cloneDeep(state)
      if (s.email) {
        s.email.push(...val.email)
      } else {
        s.email = val.email
      }
      return s
    }),
    on(setEmailTotal, (state, val) => {
      const s = cloneDeep(state)
      s.emailTotal = val.emailTotal
      return s
    })
  )
  return reducer(state, action)
}
