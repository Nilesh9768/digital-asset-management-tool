import React from 'react'

export default function DimensionInput() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>

            <div>
                <p className='dimension-label'>Width</p>
                <input className='dimension-input' type="number" />
            </div>
            <p className='cross'>x</p>
            <div>
                <p className='dimension-label'>Height</p>
                <input style={{ alignSelf: 'flex-start' }} className='dimension-input' type="number" />
            </div>

        </div>
    )
}
