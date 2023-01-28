import { appIds, daysOfDataInMs } from './constants.js'
import { doCountlyFetch } from './doCountlyFetch.js'
import { writeFile } from 'node:fs/promises'

interface ActiveUsersResponse {
  calculating: boolean
  data: Record<string, {
    d: number
    w: number
    m: number
  }>
}

/**
 * Print out a CSV of the number of unique users per day for each app
 */
export async function downloadDashboardData (): Promise<void> {
  // let dailyOutputCsv: string = ''
  // let weeklyOutputCsv: string = ''
  // let monthlyOutputCsv: string = ''
  let printedHeaders = false
  const dailyArray = []
  const weeklyArray = []
  const monthlyArray = []
  for (const [appName, appId] of Object.entries(appIds)) {
    // let calculating = true
    let response: ActiveUsersResponse = { calculating: true, data: {} }
    while (response.calculating) {
      /**
       * @see https://api.count.ly/reference/oanalyticssessions
       */
      response = await doCountlyFetch({ path: '/o/active_users', appId, extraParams: `period=[${new Date().getTime() - daysOfDataInMs}, ${new Date().getTime()}]` })
      // eslint-disable-next-line no-console
      console.log(`${appName} calculating? `, response.calculating)
      if (response.calculating) {
        await new Promise((resolve) => setTimeout(resolve, 4000))
      }
    }
    const activeUserData = []
    for (const [key, value] of Object.entries(response.data)) {
      activeUserData.push({
        _id: key,
        ...value
      })
    }

    activeUserData.sort((a, b) => new Date(a._id).getTime() - new Date(b._id).getTime())

    // output the name of the app as row headers and the date labels as column headers
    if (!printedHeaders) {
      const dateLabels = activeUserData.map((day: any) => new Date(day._id).toISOString().split('T')[0])
      dailyArray.push(['App Name', ...dateLabels])
      // dailyOutputCsv = `App Name, ${dateLabels.join(', ')}\n`
      weeklyArray.push(['App Name', ...dateLabels])
      // weeklyOutputCsv = `App Name, ${dateLabels.join(', ')}\n`
      monthlyArray.push(['App Name', ...dateLabels])
      // monthlyOutputCsv = `App Name, ${dateLabels.join(', ')}\n`
      printedHeaders = true
    }

    dailyArray.push([appName, ...activeUserData.map((day: any) => day.d)])
    // dailyOutputCsv = `${dailyOutputCsv}${appName}, ${activeUserData.map((day: any) => day.d).join(', ')}\n`
    weeklyArray.push([appName, ...activeUserData.map((day: any) => day.d)])
    // weeklyOutputCsv = `${weeklyOutputCsv}${appName}, ${activeUserData.map((day: any) => day.w).join(', ')}\n`
    monthlyArray.push([appName, ...activeUserData.map((day: any) => day.d)])
    // monthlyOutputCsv = `${monthlyOutputCsv}${appName}, ${activeUserData.map((day: any) => day.m).join(', ')}\n`
  }
  // Write the outputs to their appropriate Csv files
  await writeFile('./output/activeUsers-daily.json', JSON.stringify(dailyArray, null, 2))
  await writeFile('./output/activeUsers-daily.csv', dailyArray.join('\n').toString())
  await writeFile('./output/activeUsers-weekly.json', JSON.stringify(weeklyArray, null, 2))
  await writeFile('./output/activeUsers-weekly.csv', weeklyArray.join('\n').toString())
  await writeFile('./output/activeUsers-monthly.json', JSON.stringify(monthlyArray, null, 2))
  await writeFile('./output/activeUsers-monthly.csv', monthlyArray.join('\n').toString())
}
