import netrc from 'netrc'

const myNetrc = netrc()
export const hostname = 'countly.ipfs.tech'
export const authorizationHeader = `Basic ${Buffer.from(`${myNetrc['countly.ipfs.tech'].login}:${myNetrc['countly.ipfs.tech'].password}`).toString('base64')}`
// eslint-disable-next-line no-console
// console.log('myNetrc[\'countly.ipfs.tech\'].login: ', myNetrc['countly.ipfs.tech'].login)
export const baseOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: authorizationHeader
  }
}

async function getApiKey (): Promise<string> {
  const response = await fetch(`https://${hostname}/api-key`, {
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      accept: 'text/plain'
    }
  })

  return await response.text()
}

export const apiKey = await getApiKey()

/**
 * 90 days of data
 */
export const daysOfDataInMs = 1000 * 60 * 60 * 24 * 90

export const appIds = {
  // Webui.ipfs.io
  'ipfs-webui': '5c6e72803fd4432348b8119c',

  // webui-kubo
  'ipfs-webui-kubo': '63c596762a7760344a6b2cfd',

  // ipfs-desktop
  'ipfs-desktop': '5c6ec2b13fd4432348b811a0',

  // ipfs-companion
  'ipfs-companion': '639cbbcf8e6f3439c3796738',

  // public gateway checker
  'public-gateway-checker': '6345a52a31fdc11369a2f2db',

  // starmap.site
  'starmap.site': '639915ff21fd4330c469a191',

  // cid-utils-website
  'cid-utils-website': '63cf2d6ed09125d219d3d86c',

  // explore.ipld.io
  'explore.ipld.io': '63cef029d09125d219d3d69a',

  // ipfs-check
  'ipfs-check': '63d039e622fb279599709b09',

  // ipfs-dag-builder-vis
  'ipfs-dag-builder-vis': '63cee76ad09125d219d3d640',

  // pinning-service-compliance
  'pinning-service-compliance': '63cf08ccd09125d219d3d776',

  // pl-diagnose
  'pl-diagnose': '63cef095d09125d219d3d6a6'
}
