import { downloadDashboardData } from './downloadDashboardData.js'
import { updateGoogleSheets } from './updateGoogleSheets.js'

await downloadDashboardData()
await updateGoogleSheets()
