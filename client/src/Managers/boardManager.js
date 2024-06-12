const _apiUrl = "/api/board";

export const getBoardsByUserId = (userId) =>
{
    return fetch(`${_apiUrl}/${userId}`).then(response => response.json());
}

export const createBoard = async (boardData) => {
    const response = await fetch(`${_apiUrl}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(boardData)
    });
    
    const data = await response.json();
    return data;
}