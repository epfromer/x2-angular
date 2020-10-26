import { createAction } from '@ngrx/store'

export const setCustodiansLoading = createAction(
  'custodians/setCustodiansLoading'
)
export const setCustodians = createAction('custodians/setCustodians')
