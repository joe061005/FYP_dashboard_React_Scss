import React from 'react'
import './customUI.scss'

const CustomUI = (message, func, onClose) => {
    return (
        <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>{message}</p>
            <button onClick={() => {onClose()}}>No</button>
            <button onClick={() => {func()}}>Yes</button>
        </div>
    )
}

export default CustomUI