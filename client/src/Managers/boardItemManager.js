const apiUrl = "/api/boardItem";

export const getItemsForBoard = (boardId) => {

    return fetch(`${apiUrl}/${boardId}`)
    .then(res => res.json());
   
};

export const getBoardItemsByItemId = (itemId) => {
    return fetch(`${apiUrl}/${itemId}/get`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetching board items');
        }
        return res.json();
      });
  };
  
  export const updateBoardItems = (itemId, boardIds) => {
    return fetch(`${apiUrl}/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(boardIds)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Error updating board items');
      }
    });
  };

  