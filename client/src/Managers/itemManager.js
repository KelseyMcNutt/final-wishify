const _apiUrl = "/api/itemDetails";

export const getItemDetailsById = (itemId) =>
{
    return fetch(`${_apiUrl}/${itemId}`)
    .then(res => res.json());
}

export const updateItemDetails = (itemId, item) => {
   
      return fetch(`${_apiUrl}/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
     
  };

  export const deleteItem = (itemId) => {
    return fetch(`${_apiUrl}/${itemId}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Error deleting item');
      }
    });
  };

  export const getAllItemsByUserId = (userId) => {
    return fetch(`${_apiUrl}/user/${userId}`)
    .then(res => res.json());
      
  };

  export const createItem = (item, userId) => {
    return fetch(`${_apiUrl}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
  };

  export const addCartItem = (itemId) => {
    return fetch(`${_apiUrl}/${itemId}/cart`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    });
};