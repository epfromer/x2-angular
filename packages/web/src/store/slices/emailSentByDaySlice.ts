import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store'
import cloneDeep from 'lodash.clonedeep'
import { EmailSentByDay } from '../types'

export interface EmailSentByDayState {
  emailSentByDayLoading: boolean
  emailSentByDay: Array<EmailSentByDay> | undefined
}
const initialState: EmailSentByDayState = {
  emailSentByDayLoading: false,
  emailSentByDay: undefined,
}

// Actions
export const setEmailSentByDayLoading = createAction(
  'setEmailSentByDayLoading',
  (emailSentByDayLoading: boolean) => ({ emailSentByDayLoading })
)
export const setEmailSentByDay = createAction(
  'setEmailSentByDay',
  (emailSentByDay: Array<EmailSentByDay>) => ({ emailSentByDay })
)

// Reducer
export function emailSentByDayReducer(
  state: EmailSentByDayState | undefined,
  action: Action
): EmailSentByDayState {
  const reducer = createReducer(
    initialState,
    on(setEmailSentByDayLoading, (state, val) => {
      const s = cloneDeep(state)
      s.emailSentByDayLoading = val.emailSentByDayLoading
      return s
    }),
    on(setEmailSentByDay, (state, val) => {
      const s = cloneDeep(state)
      s.emailSentByDay = val.emailSentByDay
      return s
    })
  )
  return reducer(state, action)
}

// selectors & getters
export const getEmailSentByDayLoading = createSelector(
  createFeatureSelector<EmailSentByDayState>('emailSentByDay'),
  (state) => state.emailSentByDayLoading
)
export const getEmailSentByDay = createSelector(
  createFeatureSelector<EmailSentByDayState>('emailSentByDay'),
  (state) => state.emailSentByDay
)
