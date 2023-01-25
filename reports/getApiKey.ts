import { baseOptions, hostname } from './constants.js';


export async function getApiKey() {
  const response = await fetch(`https://${hostname}/api-key`, {
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      accept: 'text/plain',
    }
  });

 return await response.text();
}
