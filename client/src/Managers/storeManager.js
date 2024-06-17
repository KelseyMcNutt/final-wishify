const _apiUrl = "/api/stores";

export const getUserStores = (userId) =>
{
    return fetch(`${_apiUrl}/user-stores/${userId}`)
    .then(res => res.json());
}

export const addStore = (store) => {
    return fetch(`${_apiUrl}/add-store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(store)
    })
  };