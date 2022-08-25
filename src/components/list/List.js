import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import Card from '../card/Card';
import Button from '../button/Button';
import { ItemTypes } from '../../utils/types';
import { deleteList } from '../../actions/listActions';
import { moveCard, sortCard } from '../../actions/cardActions';

import './list.scss';

const List = ({title, cards, listID}) => {

    const dispatch = useDispatch();

    const movingCard = useCallback((dragIndex, hoverIndex, listID) => {
        dispatch(sortCard(dragIndex, hoverIndex, listID));
    },[])

    const data = cards.map((card, i) => {
        return (
            <Card text={card.text} id={card.id} index={i} key={card.id} listID={listID} movingCard={movingCard}/>
        )
    })

    const onCardMove = (cardId, currentListID, targetListID) => {
        dispatch(moveCard(cardId, currentListID, targetListID));
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: item  => onCardMove(item.id, item.listID, listID),
        collect: monitor => ({
          isOver: !!monitor.isOver()
        }),
    }))

    const onDeleteList = (listID) => {
        dispatch(deleteList(listID))
    }

    return (
        <>
            <div className="list">
                <div className='list__top'>
                    <h2 
                        className="list__title"
                        >{title}</h2>
                    <span 
                        className='list__cross'
                        onClick={() => onDeleteList(listID)}
                        >╳</span>
                </div>
                <div 
                    className="card__wrapper"
                    ref={drop}
                    style={{
                        backgroundColor: isOver ? '#E1D1D1' : '',
                    }}>
                    {data}
                </div>
                <Button type='card' listID={listID}/>
            </div>
        </>
    )
}

export default List;