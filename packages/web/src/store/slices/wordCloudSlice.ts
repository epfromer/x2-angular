import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store'
import cloneDeep from 'lodash.clonedeep'
import { WordCloudTag } from '../types'

export interface WordCloudState {
  wordCloudLoading: boolean
  wordCloud: Array<WordCloudTag> | undefined
}
const initialState: WordCloudState = {
  wordCloudLoading: false,
  wordCloud: undefined,
}

// Actions
export const setWordCloudLoading = createAction(
  'setWordCloudLoading',
  (wordCloudLoading: boolean) => ({ wordCloudLoading })
)
export const setWordCloud = createAction(
  'setWordCloud',
  (wordCloud: Array<WordCloudTag>) => ({ wordCloud })
)

// Reducer
export function wordCloudReducer(
  state: WordCloudState | undefined,
  action: Action
): WordCloudState {
  const reducer = createReducer(
    initialState,
    on(setWordCloudLoading, (state, val) => {
      const s = cloneDeep(state)
      s.wordCloudLoading = val.wordCloudLoading
      return s
    }),
    on(setWordCloud, (state, val) => {
      const s = cloneDeep(state)
      s.wordCloud = val.wordCloud
      return s
    })
  )
  return reducer(state, action)
}

// selectors & getters
export const getWordCloudLoading = createSelector(
  createFeatureSelector<WordCloudState>('wordCloud'),
  (state) => state.wordCloudLoading
)
export const getWordCloud = createSelector(
  createFeatureSelector<WordCloudState>('wordCloud'),
  (state) => state.wordCloud
)
