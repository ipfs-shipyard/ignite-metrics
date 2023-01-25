import { apiKey, baseOptions, hostname } from './constants.js';

export async function doCountlyFetch({ path = '/o', fetchOptions = {}, appId, extraParams }: { path: string, fetchOptions?: RequestInit, appId: string, extraParams: string }) {
  const response = await fetch(`https://${hostname}${path}?api_key=${apiKey}&app_id=${appId}&${extraParams}`, {...baseOptions, ...fetchOptions});
  return await response.json();
}
