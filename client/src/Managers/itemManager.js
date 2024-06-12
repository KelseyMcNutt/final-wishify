const _apiUrl = "/api/itemDetails";

export const getItemDetailsById = (itemId) =>
{
    return fetch(`${_apiUrl}/${itemId}`)
    .then(res => res.json());
}