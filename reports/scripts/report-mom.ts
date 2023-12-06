import { readFile } from 'fs/promises';

/**
 * Must run `npm run download-data <daysToDownload>` before running this script
 *
 * Reads the data output by `downloadDashboardData` and outputs them to the console
 * This script accepts a single argument, the month and year to filter by, in the format `YYYY-MM`
 * For example, to filter by May 2023, run `npm report-mom.js 2023-05`
 *
 * This script is used to get the values for the MoM spreadsheet at:
 * https://docs.google.com/spreadsheets/d/1xq36kjThObEaRKzb3VRtXEs9RgM-bfgfjGbi1vbPUiE/edit#gid=2037430789
 */

const filterMonth = process.argv[2]
if (filterMonth == null) {
  throw new Error('filterMonth must be provided. use the format YYYY-MM')
}
['monthly'].forEach(async (period) => {
  const data = await readFile(`./output/activeUsers-${period}.json`, { encoding: 'utf-8' })
  /**
   * the JSON is in the format of an array of arrays, where
   * the first array is the headers in the format of [labelForAppNames, ...dateStrings]
   * the rest of the arrays are the data in the format of [appName, ...values]
   */
  const parsedData = JSON.parse(data)
  // Find all of the headers in the first row that start with the filterMonth
  const [headers, ...rows] = parsedData
  const headersAndIndex = headers.reduce((acc: Record<string, number|string>, header: string, index: number) => {
    if (header.startsWith(filterMonth)) {
      acc[header] = index
      acc.latestDateIndex = index
      acc.latestDateFound = header
    }
    return acc
  }, {})

  console.log(`Getting values from day ${headersAndIndex.latestDateFound} at index ${headersAndIndex.latestDateIndex} for period ${period}`)

  const monthLabel = new Date(`${filterMonth}-10`).toLocaleString('en-US', { month: 'long' })
  const filterMonthLabel = `${monthLabel} (${headersAndIndex.latestDateFound})`

  const { latestDateIndex } = headersAndIndex
  const filteredData = rows.reduce((acc: Record<string, any>[], row: [string, ...number[]]) => {
    const [appName, ...rest] = row
    const value = rest[latestDateIndex]

    acc.push({ 'App Name': appName, [filterMonthLabel]: value })
    return acc
  }, [])

  console.log(`\n${period} MoM data for ${filterMonthLabel}:`)
  // need to sort the filteredData so that it appears in the order of
  const sortedAppNames = [
    'ipfs-companion',
    'ipfs-desktop',
    'public-gateway-checker',
    'ipfs-webui-kubo',
    'ipfs-webui',
    'cid-utils-website',
    'explore.ipld.io',
    'pinning-service-compliance',
    'starmap.site',
    'ipfs-check',
    'ipfs-dag-builder-vis',
    'pl-diagnose'
  ]
  const sortedData = filteredData.sort((a: any, b: any) => sortedAppNames.indexOf(a['App Name']) - sortedAppNames.indexOf(b['App Name']))
  console.table(sortedData, ['App Name', filterMonthLabel])
})
