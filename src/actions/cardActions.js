export const addCard = (card, listID) => {
    return {
        type: 'ADD_CARD',
        payload: {card, listID}
    }
}

export const deleteCard = (id, listID) => {
    return {
        type: 'DELETE_CARD',
        payload: {id, listID}
    }
}

export const moveCard = (cardId, currentListID, targetListID) => {
    return {
        type: 'MOVE_CARD',
        payload: {cardId, currentListID, targetListID}
    }
}

export const sortCard = (dragIndex, hoverIndex, listID) => {
    return {
        type: 'SORT_CARD',
        payload: {dragIndex, hoverIndex, listID}
    } 
}