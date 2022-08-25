import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector, useDispatch } from 'react-redux';

import List from '../list/List';
import DraggableList from '../draggableList/DraggableList';
import Button from '../button/Button';
import { sortList } from '../../actions/listActions';

import './App.scss';

const App = () => {

  const lists = useSelector(state => state);
  const dispatch = useDispatch();

  const sortingList = (dragIndex, hoverIndex) => {
    dispatch(sortList(dragIndex, hoverIndex));
  }

  const data = lists.map((list, i) => {
    return (
      <DraggableList index={i} listID={list.id} key={list.id} sortingList={sortingList}>
        <List title={list.title} cards={list.cards} index={i} listID={list.id} key={list.id}/>
      </DraggableList>
    )
  })

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className='app__wrapper'>
          {data}
          <Button type='list'/>
        </div>
      </DndProvider>
    </>
  )
}

export default App;
