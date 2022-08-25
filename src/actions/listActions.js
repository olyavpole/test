export const addList = (list) => {
    return {
        type: 'ADD_LIST',
        payload: list
    }
}

export const deleteList = (listID) => {
    return {
        type: 'DELETE_LIST',
        payload: listID
    }
}

export const sortList = (dragIndex, hoverIndex) => {
    return {
        type: 'SORT_LIST',
        payload: {dragIndex, hoverIndex}
    } 
}