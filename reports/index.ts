import { downloadDashboardData } from './downloadDashboardData.js'
import { updateSheet } from './updateGoogleSheets.js'

const {daily, weekly, monthly} = await downloadDashboardData()

await Promise.all([
  updateSheet('Daily Active Users', daily),
  updateSheet('Weekly Active Users', weekly),
  updateSheet('Monthly Active Users', monthly)
])
