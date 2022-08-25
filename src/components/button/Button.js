import { useState } from 'react';

import AddForm from '../addForm/AddForm';

import './button.scss';

const Button = ({type, listID}) => {

    const [formOpen, setFormOpen] = useState(false);

    const classes = type === 'card' ? 'button--card' : 'button--list';

    const renderAddButton = () => {
        
        return (
            <button 
                className={`button ${classes}`}
                onClick={() => setFormOpen(true)}
                >add new {type}</button>
        )
    }

    const data = formOpen ? <AddForm type={type} listID={listID} setFormOpen={setFormOpen}/> : renderAddButton();

    return (
        <>
            {data}
        </>
    )
}

export default Button;