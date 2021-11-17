import { useState, useEffect } from 'react'

type DimensionInputProp = {
    onDimensionChange?: (width: number, height: number) => void,
    widthVal?: number,
    heightVal?: number
}
export default function DimensionInput({ onDimensionChange,widthVal,heightVal }: DimensionInputProp) {

    const [width, setWidth] = useState<number>(200)
    const [height, setHeight] = useState<number>(100)


    useEffect(() => {

        const tempFun = () =>{
            if (onDimensionChange) {
                console.log(width, height)
                onDimensionChange(width, height)
            }
        }
        
        tempFun()
    }, [width, height])
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>

            <div>
                <p className='dimension-label'>Width</p>

                <input
                    className='dimension-input'
                    type="number"
                    value={widthVal}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                />
            </div>
            <p className='cross'>x</p>
            <div>
                <p className='dimension-label'>Height</p>
                <input
                    style={{ alignSelf: 'flex-start' }}
                    className='dimension-input'
                    type="number"
                    value={heightVal}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                />
            </div>

        </div>
    )
}
