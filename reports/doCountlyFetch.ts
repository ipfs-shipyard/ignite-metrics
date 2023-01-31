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
  return await response.json();
}
