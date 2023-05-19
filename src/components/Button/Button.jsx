import React from 'react';
import './Button.css'

const Button = (props) => {
    return (
        <div>
            <input type={props.type} value={props.value} className='submitLogin' disabled={props.disabled} onClick={props.onClick}/>
        </div>
    );
};

export default Button;