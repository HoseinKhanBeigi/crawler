import { getHeaderCookie, getCookie } from './utils';
import { BASE_VARIABLE_KEYS, resolveVariable } from './serviceConfig';

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch(fetch, { cookie }) {
  // NOTE: Tweak the default options to suite your application needs
  /* const defaults = {
    method: 'POST', // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : null),
    },
  }; */

  return async (url, options, context) => {
    /**
     * In any state the fetch function, should be able to work with the latest token, we need to update the token with cookies.
     * specially useful, when user logs in/out, our manually manipulated the application cookies
     */
    const accessToken = process.env.BROWSER
      ? getCookie('access_token')
      : getHeaderCookie('access_token', cookie);
    const extendedOptions = options;
    if (accessToken && extendedOptions.headers)
      extendedOptions.headers.Authorization = `Bearer ${accessToken}`;
    if (context)
      extendedOptions.headers.Context = resolveVariable(
        BASE_VARIABLE_KEYS.CONTEXT,
      );

    return fetch(url, extendedOptions);
  };
}

export default createFetch;
