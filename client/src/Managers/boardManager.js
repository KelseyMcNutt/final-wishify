const _apiUrl = "/api/board";

export const getBoardsByUserId = (userId) =>
{
    return fetch(`${_apiUrl}/${userId}`)
    .then(response => response.json());
}

export const getBoardById = (boardId) =>
{
    return fetch (`${_apiUrl}/${boardId}/one`)
    .then(res => res.json());
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

export const deleteBoardById = (boardId) => {
    
        return fetch(`${_apiUrl}/${boardId}`, {
            method: 'DELETE'
        });
       
        
}

export const editBoardById =(boardId, boardData) => {
 
        return fetch(`${_apiUrl}/${boardId}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boardData)
        });
        // const data = await response.json();
        // return data;
    

   
}

// export const getAllBoards = () => {
//     return fetch(boardsApiUrl)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Error fetching boards');
//         }
//         return res.json();
//       });
//   };
  