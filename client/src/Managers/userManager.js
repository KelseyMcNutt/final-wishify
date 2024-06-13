const _apiUrl = "/api/user";

export const getUserProfileAndCartItems =  (userId) => {
  return fetch(`${_apiUrl}/${userId}/cart`)
  .then(res => res.json());
  
};

export const getUsersById = (userId ) => {
  return fetch(`${_apiUrl}/${userId}`)
  .then(res => res.json());
}

export const UpdateUser = (userId, userProfile) => {
  return fetch(`${_apiUrl}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userProfile)
  })
};