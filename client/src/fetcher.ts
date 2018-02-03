export namespace fetcher {
  export async function get(uri: string): Promise<any> {
    return await fetch(uri, {
      method: "GET"
    });
  }

  export async function post(uri: string, body: any): Promise<any> {
    return await fetch(uri, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }
}