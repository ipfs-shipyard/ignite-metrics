import { google } from 'googleapis'

// daily: https://docs.google.com/spreadsheets/d/1xq36kjThObEaRKzb3VRtXEs9RgM-bfgfjGbi1vbPUiE/edit#gid=0
// weekly: https://docs.google.com/spreadsheets/d/1xq36kjThObEaRKzb3VRtXEs9RgM-bfgfjGbi1vbPUiE/edit#gid=1417442855
// monthly: https://docs.google.com/spreadsheets/d/1xq36kjThObEaRKzb3VRtXEs9RgM-bfgfjGbi1vbPUiE/edit#gid=431140753
const spreadsheetId = '1xq36kjThObEaRKzb3VRtXEs9RgM-bfgfjGbi1vbPUiE'
const googleAuth = new google.auth.GoogleAuth({
  // This keyfile is a service account key obtained from https://console.cloud.google.com/iam-admin/serviceaccounts
  keyFile: 'ignite-metrics-dashboard-d99dde383c4c.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets'
})
const auth = await googleAuth.getClient()
const googleSheetsInstance = google.sheets({ version: 'v4', auth })

const jsonFiles = {
  'Daily Active Users': './output/activeUsers-daily.json',
  'Weekly Active Users': './output/activeUsers-weekly.json',
  'Monthly Active Users': './output/activeUsers-monthly.json'
}

async function updateSheet (sheetName: string, values: string[][]): Promise<void> {
  await googleSheetsInstance.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: `'${sheetName}'!A1:CN13`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      majorDimension: 'ROWS',
      values
    }
  })
}
export async function updateGoogleSheets (): Promise<void> {
  for await (const [sheetName, jsonFilePath] of Object.entries(jsonFiles)) {
    const { default: json } = await import(jsonFilePath, { assert: { type: 'json' } })
    await updateSheet(sheetName, json)
  }
}
