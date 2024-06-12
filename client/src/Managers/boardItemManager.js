const apiUrl = "/api/boardItem";

// Function to fetch items for a specific board
export const getItemsForBoard = async (boardId) => {
  try {
    const response = await fetch(`${apiUrl}/${boardId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch items for the board');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};
