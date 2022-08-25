const initialState = [
    {
        title: 'list1',
        id: 1,
        cards: [
            {
                text: 'card1',
                id: 1
            },
            {
                text: 'card2',
                id: 2,
            }
        ]
    },
    {
        title: 'list2',
        id: 2,
        cards: [
            {
                text: 'card3',
                id: 3
            },
            {
                text: 'card4',
                id: 4
            }
        ]
    },
    {
        title: 'list3',
        id: 3,
        cards: [
            {
                text: 'card5',
                id: 5
            },
            {
                text: 'card6',
                id: 6
            }
        ]
    }
];

const listReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'ADD_LIST':
            return [...state, action.payload];
        
        case 'ADD_CARD':
            return state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, action.payload.card]
                    }
                } else {
                    return list;
                }
            });

        case 'DELETE_LIST':
            return state.filter(list => list.id !== action.payload);

        case 'DELETE_CARD':
            return state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: list.cards.filter(card => card.id !== action.payload.id)
                    }
                } else {
                    return list;
                }
            });

        case 'MOVE_CARD':
            const currentList = state.filter(list => list.id === action.payload.currentListID)[0];
            const cardToMove = currentList.cards.filter(card => card.id === action.payload.cardId)[0];
            
            const targetList = state.filter(list => list.id === action.payload.targetListID)[0];
            const modifiedCurrentList = (action.payload.currentListID === action.payload.targetListID) ? currentList : 
                {
                    ...currentList,
                    cards: currentList.cards.filter(card => card.id !== action.payload.cardId)
                }
            const modifiedTargetList = {
                ...targetList,
                cards: [...targetList.cards, cardToMove]
            }
            return state.map(list => {
                if (list.id === action.payload.currentListID) {
                    return modifiedCurrentList;
                } else if (list.id === action.payload.targetListID) {
                    return modifiedTargetList;
                } else {
                    return list;
                }
            });

        case 'SORT_CARD':
            const ourList = state.filter(list => list.id === action.payload.listID)[0];
            const ourCards = [...ourList.cards];
            // чтобы вам было понятно, что обозначает этот странный код ниже:
            // тут мне надо поменять местами элементы в массиве по их индексам, код для этого взяла по первой ссылке в гугле
            const tmp = ourCards[action.payload.hoverIndex];
            ourCards[action.payload.hoverIndex] = ourCards[action.payload.dragIndex];
            ourCards[action.payload.dragIndex] = tmp;
            const ourNewList = {
                ...ourList,
                cards: ourCards
            }
            return state.map(list => {
                if (list.id === action.payload.listID) {
                    return ourNewList;
                } else {
                    return list;
                }  
            });
        
        case 'SORT_LIST':
            const stateCopy = [...state];
            const tmpr = stateCopy[action.payload.hoverIndex];
            stateCopy[action.payload.hoverIndex] = stateCopy[action.payload.dragIndex];
            stateCopy[action.payload.dragIndex] = tmpr;
            return stateCopy;
        
        default:
            return state
    }
}

export default listReducer;