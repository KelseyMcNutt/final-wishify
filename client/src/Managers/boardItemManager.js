const apiUrl = "/api/boardItem";

export const getItemsForBoard = (boardId) => {

    return fetch(`${apiUrl}/${boardId}`)
    .then(res => res.json());
   
};
