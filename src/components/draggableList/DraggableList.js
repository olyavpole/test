import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ItemTypes } from '../../utils/types';

import '../list/list.scss';

const DraggableList = (props) => {

    const {index, listID, sortingList} = props;

    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.LIST,
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
            const hoverMiddleX =
                (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = clientOffset.x - hoverBoundingRect.left;
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return
            }
            
            sortingList(dragIndex, hoverIndex);
            
            item.index = hoverIndex;
        },
    })

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.LIST,
        item: {
            listID,
            index
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    drag(drop(ref));

    return (
        <>
            <div 
                className="list__wrapper"
                data-handler-id={handlerId}
                ref={ref}
                style={{
                    opacity: isDragging ? 0 : 1,
                    cursor: 'move',
                }}
                >
                {props.children}
            </div>
        </>
    )
}

export default DraggableList;