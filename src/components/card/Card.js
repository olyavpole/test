import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { ItemTypes } from '../../utils/types';
import { deleteCard } from '../../actions/cardActions';

import './card.scss'

const Card = ({text, id, listID, index, movingCard}) => {

    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
              handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            movingCard(dragIndex, hoverIndex, listID);
            item.index = hoverIndex;
        },
    })

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {
            id,
            listID,
            index
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    drag(drop(ref));

    const dispatch = useDispatch();

    const onDeleteCard = (id, listID) => {
        dispatch(deleteCard(id, listID))
    }

    const opacity = isDragging ? 0 : 1;

    return (
        <>
            <div 
                className="card"
                data-handler-id={handlerId}
                ref={ref}
                style={{
                    opacity
                }}
                >
                <p 
                    className="card__text"
                    >{text}</p>
                <div className="card__buttons">
                    <span 
                        className='card__cross'
                        onClick={() => onDeleteCard(id, listID)}
                        >╳</span>
                    <span 
                        className='card__rename'
                        >
                    </span>
                </div>
            </div>
        </>
    )
}

export default Card;