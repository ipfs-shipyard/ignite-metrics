import { downloadDashboardData } from '../downloadDashboardData.js'

const daysInput = parseInt(process.argv[2], 10)
if (isNaN(daysInput)) {
  throw new Error('daysInput must be a number')
}
const daysOfDataMs = daysInput * 1000 * 60 * 60 * 24
const downloadOptions: Parameters<typeof downloadDashboardData>[0] = {
  daysOfDataMs,
  writeFiles: true
}
await downloadDashboardData(downloadOptions)
