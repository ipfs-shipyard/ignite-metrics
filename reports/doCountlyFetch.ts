import { apiKey, baseOptions, hostname } from './constants.js';

export async function doCountlyFetch({
  appId,
  extraParams,
  fetchOptions = {},
  path = '/o'
}: {
  appId: string,
  extraParams: string,
  fetchOptions?: RequestInit,
  path: string
}) {
  const response = await fetch(`https://${hostname}${path}?api_key=${apiKey}&app_id=${appId}&${extraParams}`, {...baseOptions, ...fetchOptions});
  try {
    return await response.json();
  } catch (e) {
    console.error(`Could not fetch data from https://${hostname}${path}`, e);
    throw e;
  }
}
