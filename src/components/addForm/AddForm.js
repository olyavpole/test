import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addList } from '../../actions/listActions';
import { addCard } from '../../actions/cardActions';

import './addForm.scss'

const AddForm = ({type, listID, setFormOpen}) => {

    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const newCard = {
        text: text,
        id: uuidv4()
    }

    const newList = {
        title: text,
        id: uuidv4(),
        cards: []
    }

    const action = type === 'card' ? addCard(newCard, listID) : addList(newList);
    const inputStyle = type === 'card' ? 'form__input--card' : 'form__input--list';
    const classes = type === 'card' ? 'form--card' : 'form--list';

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onAdd = (e) => {
        e.preventDefault();
        dispatch(action);
        setText('');
        setFormOpen(false);
    }

    const onCancel = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {    
            setText('');
            setFormOpen(false);
        }
    }

    return (
        <>
            <form 
                className={`form ${classes}`}
                onSubmit={onAdd}
                onBlur={onCancel}
                >
                <input 
                    className={`form__input ${inputStyle}`}
                    type="text" 
                    placeholder={`enter ${type} name`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    ref={inputRef}
                    required
                    />
                <div className="form__wrapper">
                    <button 
                        className="form__btn form__btn--left"
                        type="submit"
                    >add {type}</button>
                    <button 
                        className="form__btn form__btn--right"
                        type='button'
                        onClick={onCancel}
                    >cancel</button>
                </div>
            </form>
        </>
    )
}

export default AddForm;