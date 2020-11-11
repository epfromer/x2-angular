import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppSettingsState } from './slices/appSettingsSlice'
import { CustodiansState } from './slices/custodiansSlice'
import { EmailSentByDayState } from './slices/emailSentByDaySlice'
import { EmailState } from './slices/emailSlice'
import { QueryState } from './slices/querySlice'
import { WordCloudState } from './slices/wordCloudSlice'
import { Custodian, EmailXferedDatum } from './types'

// appSettingsSlice
export const selectDarkMode = createSelector(
  createFeatureSelector<AppSettingsState>('appSettings'),
  (state) => state.darkMode
)
export const selectThemeName = createSelector(
  createFeatureSelector<AppSettingsState>('appSettings'),
  (state) => state.themeName
)

// authenticationSlice

// custodiansSlice
export const selectCustodiansLoading = createSelector(
  createFeatureSelector<CustodiansState>('custodians'),
  (state) => state.custodiansLoading
)
export const selectCustodians = createSelector(
  createFeatureSelector<CustodiansState>('custodians'),
  (state) => state.custodians
)
export function getEmailSenders(
  custodians: Array<Custodian>
): Array<EmailXferedDatum> {
  const data: Array<EmailXferedDatum> = []
  if (custodians) {
    custodians.forEach((custodian: Custodian) => {
      if (custodian.senderTotal) {
        data.push({
          name: custodian.name,
          value: custodian.senderTotal,
          color: custodian.color,
        })
      }
    })
  }
  return data
}
export function getEmailReceivers(
  custodians: Array<Custodian>
): Array<EmailXferedDatum> {
  const data: Array<EmailXferedDatum> = []
  if (custodians) {
    custodians.forEach((custodian: Custodian) => {
      if (custodian.receiverTotal) {
        data.push({
          name: custodian.name,
          value: custodian.receiverTotal,
          color: custodian.color,
        })
      }
    })
  }
  return data
}
export interface IDColorKey {
  id: string
  color: string
}
export interface EmailSent {
  source: string
  target: string
  value: number
}
export interface EmailSentByCustodian {
  data: Array<EmailSent>
  nodes: Array<IDColorKey>
}
export function getEmailSentByCustodian(
  custodians: Array<Custodian>
): EmailSentByCustodian {
  const custodianNameFromId = (id: string) =>
    custodians.find((c: Custodian) => c.id === id).name

  const data: Array<EmailSent> = []
  const nodes: Array<IDColorKey> = []

  if (custodians) {
    //  create array of [from, to, number sent]
    custodians.forEach((fromCustodian: Custodian) => {
      fromCustodian.toCustodians.forEach((toCustodian) => {
        data.push({
          source: fromCustodian.name,
          target: custodianNameFromId(toCustodian.custodianId),
          value: toCustodian.total,
        })
      })
    })
    // and array of color keys
    custodians.forEach((custodian: Custodian) => {
      nodes.push({ id: custodian.name, color: custodian.color })
    })
  }

  return { data, nodes }
}

// emailSentByDay
export const selectEmailSentByDayLoading = createSelector(
  createFeatureSelector<EmailSentByDayState>('emailSentByDay'),
  (state) => state.emailSentByDayLoading
)
export const selectEmailSentByDay = createSelector(
  createFeatureSelector<EmailSentByDayState>('emailSentByDay'),
  (state) => state.emailSentByDay
)

// emailSlice
export const selectEmailLoading = createSelector(
  createFeatureSelector<EmailState>('email'),
  (state) => state.emailLoading
)
export const selectEmail = createSelector(
  createFeatureSelector<EmailState>('email'),
  (state) => state.email
)
export const selectEmailTotal = createSelector(
  createFeatureSelector<EmailState>('email'),
  (state) => state.emailTotal
)

// querySlice
export const selectAllText = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.allText
)
export const selectBody = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.body
)
export const selectEmailListPage = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.emailListPage
)
export const selectFrom = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.emailListPage
)
export const selectOrder = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.emailListPage
)
export const selectSort = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.emailListPage
)
export const selectSent = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.emailListPage
)
export const selectSubject = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.emailListPage
)
export const selectTimeSpan = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.emailListPage
)
export const selectTo = createSelector(
  createFeatureSelector<QueryState>('query'),
  (state) => state.emailListPage
)

// searchHistorySlice

// wordCloudSlice
export const selectWordCloudLoading = createSelector(
  createFeatureSelector<WordCloudState>('wordCloud'),
  (state) => state.wordCloudLoading
)
export const selectWordCloud = createSelector(
  createFeatureSelector<WordCloudState>('wordCloud'),
  (state) => state.wordCloud
)
