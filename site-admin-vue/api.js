export function API() {
  const base = "/web/site-admin-vue/";

  async function request(how, url) {
    const responce = await fetch(url, { method: how });
    const data = await responce.json();
    return data;
  }

  return { base, request }
}