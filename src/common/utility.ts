export async function fetchAs<REQ, RES>(verb: 'GET' | 'POST', port: number, path: string, data?: REQ) {
  if (verb === 'GET') {
    const result = await fetch(process.env.REACT_APP_SERVER_URL + `:${port}` + path, {
      method: verb,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
    });
    const json = await result.json();
    return json as unknown as RES;
  } else if (verb === 'POST' && data !== undefined) {
    const result = await fetch(process.env.SERVER_URL + path, {
      method: verb,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await result.json();
    return json as unknown as RES;
  }

}