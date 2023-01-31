# Explanation

The code in this folder (`reports`) is used to generate CSV files for getting daily/weekly/monthly active users for all Ignite team (ipfs-gui) projects.

The CSV content is then loaded into it's respective sheet at https://docs.google.com/spreadsheets/d/1xq36kjThObEaRKzb3VRtXEs9RgM-bfgfjGbi1vbPUiE/edit#gid=755468744

The charts in the "Charts" sheet are loaded in our Notion page at https://www.notion.so/pl-strflt/Ignite-IPFS-GUI-Tools-3bc1c1bf54d74f928bf11ef59c876b74#b6970aa92e914114848fbddd84eab2ba

NOTE: The below instructions do not need to be followed once our GitHub Action is merged. The data will update according to the scheduled GitHub Action at [`../.github/workflows/metrics-update.yml`](../.github/workflows/metrics-update.yml)

## With google sheets authentication

You need the following ENV vars set properly:

* `GOOGLE_CREDENTIALS` - Your 'JSON service account key' file stringified into a single line

Just run `npm run update-dashboards`. This will download all data from countly and then automatically update the google sheets.

## How to get the data from countly

You need the following ENV vars set properly:

* `COUNTLY_USERNAME` - The username you use to login to the countly server
* `COUNTLY_PASSWORD` - The password you use to login to the countly server

Inside the `./reports` folder, run

```bash
npm install
npm run get-csv
```

## How to copy the data to google spreadsheets (manually)

If you have a valid keyfile for google sheets authentication

1. Open up the relevant `./reports/output/*.csv` daily/weekly/monthly file and copy its contents.
1. Paste that content into the relevant google sheet, cell A1, at https://docs.google.com/spreadsheets/d/1xq36kjThObEaRKzb3VRtXEs9RgM-bfgfjGbi1vbPUiE/edit#gid=755468744
1. Select "Data->Split Text to columns"

The charts and everything should automatically update.

## How to embed into Notion

This is already done and should automatically update, but if it needs redone, it's somewhat like follows:

***NOTE:*** DO NOT CHANGE THE Published Content & Settings unless you know what you're doing. You will break existing embeds if you change this.

1. click the three dots in the top right of the chart.
1. select "publish chart"
1. Select the chart you wish to get the link for (in the first dropdown). Leave "Interactive" selected (in the second dropdown).
1. Copy the link
1. Go to Notion where you want to embed. Type `/embed` and select the generic embed "for PDFs, google maps, and more"
1. Paste the link you copied from google sheets.

