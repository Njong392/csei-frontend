
const fetchWithCookies = async (url, method = 'GET', body = null) => {
    const options = {
        method,
        credentials: 'include', // Include cookies in the request
        headers: {
            'Content-Type': 'application/json',
        }
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options)

    if(res.status === 401){
     
        throw new Error('Unauthorized access. Please log in again.');
    }

    if(!res.ok){
        const error = await res.json()
        throw new Error(error.error || 'Request failed');
    }

    return await res.json()
}

export default fetchWithCookies;