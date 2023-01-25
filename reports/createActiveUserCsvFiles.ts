import { appIds } from './constants.js';
import { doCountlyFetch } from './doCountlyFetch.js';
import { writeFile } from 'node:fs/promises';

interface ActiveUsersResponse {
  calculating: boolean
  data: Record<string, {
    d: number,
    w: number
    m: number,
  }>}
/**
 * Print out a CSV of the number of unique users per day for each app
 */
export async function createActiveUserCsvFiles() {

  let dailyOutputCsv: string = ''
  let weeklyOutputCsv: string = ''
  let monthlyOutputCsv: string = ''
  let printedHeaders = false
  for (let [appName, appId] of Object.entries(appIds)) {
    /**
     * @see https://api.count.ly/reference/oanalyticssessions
     */
    const response: ActiveUsersResponse = await doCountlyFetch({ path: '/o/active_users', appId, extraParams: `period=[${new Date('2020-01-01').getTime()}, ${new Date().getTime()}]` });
    const activeUserData = [];
    for (const [key, value] of Object.entries(response.data)) {
      activeUserData.push({
        _id: key,
        ...value,
      })
    }
    activeUserData.sort((a, b) => new Date(a._id).getTime() - new Date(b._id).getTime());

    // output the name of the app as row headers and the date labels as column headers
    if (!printedHeaders) {
      dailyOutputCsv = `App Name, ${activeUserData.map((day: any) => new Date(day._id).toISOString().split('T')[0]).join(', ')}\n`;
      weeklyOutputCsv = `App Name, ${activeUserData.map((day: any) => new Date(day._id).toISOString().split('T')[0]).join(', ')}\n`;
      monthlyOutputCsv = `App Name, ${activeUserData.map((day: any) => new Date(day._id).toISOString().split('T')[0]).join(', ')}\n`;
      printedHeaders = true;
    }

    dailyOutputCsv = `${dailyOutputCsv}${appName}, ${activeUserData.map((day: any) => day.d).join(', ')}\n`;
    weeklyOutputCsv = `${weeklyOutputCsv}${appName}, ${activeUserData.map((day: any) => day.w).join(', ')}\n`;
    monthlyOutputCsv = `${monthlyOutputCsv}${appName}, ${activeUserData.map((day: any) => day.m).join(', ')}\n`;

  }
  //Write the outputs to their appropriate Csv files
  await writeFile('./output/activeUsers-daily.csv', dailyOutputCsv)
  await writeFile('./output/activeUsers-weekly.csv', weeklyOutputCsv)
  await writeFile('./output/activeUsers-monthly.csv', monthlyOutputCsv)
}
