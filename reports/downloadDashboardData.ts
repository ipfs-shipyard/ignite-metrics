import { writeFile } from 'node:fs/promises'

import { appIds, daysOfDataInMs } from './constants.js'
import { doCountlyFetch } from './doCountlyFetch.js'
import type { googleSheetData } from './types.js'

interface ActiveUsersResponse {
  calculating: boolean
  data: Record<string, {
    d: number
    w: number
    m: number
  }>
}

interface DailyData {
  _id: string
  date: Date
  d: number
  w: number
  m: number
}

export interface DashboardData {
  daily: googleSheetData
  weekly: googleSheetData
  monthly: googleSheetData
}

/**
 * Print out a CSV of the number of unique users per day for each app
 */
export async function downloadDashboardData ({ writeFiles = false }: { writeFiles?: boolean } = {}): Promise<DashboardData> {
  const todayEpoch = Date.now()
  const dailyArray: googleSheetData = []
  const weeklyArray: googleSheetData = []
  const monthlyArray: googleSheetData = []
  let headers: googleSheetData[0]
  const results = await Promise.all(Object.entries(appIds).map(async ([appName, appId]) => {
    let response: ActiveUsersResponse = { calculating: true, data: {} }
    while (response.calculating) {
      /**
       * @see https://api.count.ly/reference/oanalyticssessions
       */
      response = await doCountlyFetch({ path: '/o/active_users', appId, extraParams: `period=[${todayEpoch - daysOfDataInMs}, ${todayEpoch}]` })
      // eslint-disable-next-line no-console
      console.log(`${appName} calculating? `, response.calculating)
      if (response.calculating) {
        await new Promise((resolve) => setTimeout(resolve, 4000))
      }
    }
    const activeUserData: DailyData[] = []
    for (const [key, value] of Object.entries(response.data)) {
      activeUserData.push({
        _id: key,
        date: new Date(key),
        ...value
      })
    }

    activeUserData.sort((a, b) => a.date.getTime() - a.date.getTime())

    // output the name of the app as row headers and the date labels as column headers
    if (headers == null) {
      headers = ['App Name', ...activeUserData.map((day) => day.date.toISOString().split('T')[0])]
      dailyArray.push(headers)
      weeklyArray.push(headers)
      monthlyArray.push(headers)
    }
    return {
      appName,
      daily: [appName, ...activeUserData.map((day) => day.d)],
      weekly: [appName, ...activeUserData.map((day) => day.w)],
      monthly: [appName, ...activeUserData.map((day) => day.m)]
    }

  }))

  // now ensure that the arrays are in the same order as appIds
  for (const [appName,] of Object.entries(appIds)) {
    const result = results.find((result) => result.appName === appName)
    if (result) {
      dailyArray.push(result.daily)
      weeklyArray.push(result.weekly)
      monthlyArray.push(result.monthly)
    }
  }

  if (writeFiles) {
    // Write the outputs to their appropriate Csv files
    await writeFile('./output/activeUsers-daily.json', JSON.stringify(dailyArray, null, 2))
    await writeFile('./output/activeUsers-daily.csv', dailyArray.join('\n').toString())
    await writeFile('./output/activeUsers-weekly.json', JSON.stringify(weeklyArray, null, 2))
    await writeFile('./output/activeUsers-weekly.csv', weeklyArray.join('\n').toString())
    await writeFile('./output/activeUsers-monthly.json', JSON.stringify(monthlyArray, null, 2))
    await writeFile('./output/activeUsers-monthly.csv', monthlyArray.join('\n').toString())
  }

  return {
    daily: dailyArray,
    weekly: weeklyArray,
    monthly: monthlyArray
  }
}
