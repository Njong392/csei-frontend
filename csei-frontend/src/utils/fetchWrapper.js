
const fetchWithCookies = async (url, method = 'GET', body = null, opts = {}) => {
    const {
        withCredentials = true,
        headers =  {},
        ...rest
    } = opts

    const options = {
        method,
        credentials: withCredentials ? 'include' : 'same-origin', // Include cookies in the request if withCredentials is set to true
        headers: {
            'Content-Type': 'application/json',
        },
        ...rest
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options)

    if (!res.ok) {
      let errorMsg = "Request failed";
      try {
        const error = await res.json();
        errorMsg = error.error || error.message || errorMsg;
      } catch {
        // If response is not JSON, keep default errorMsg
      }
      throw new Error(errorMsg);
    }

    return await res.json()
}

export default fetchWithCookies;