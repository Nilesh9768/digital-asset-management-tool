import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export const handleStyle : React.CSSProperties = {
    backgroundColor: "rgba(101, 88, 218, 1)",
    height:7,
    width:7,
    position:'relative',
    bottom:-2,
    border: 'none',
}
export const railStyle = {
    backgroundColor: 'rgba(59, 58, 58,0.2)',
    height:2
}
export const trackStyle = {
    background: "rgba(101, 88, 218, 1)",
    height:2
}

export const effectsProperties = [
    {
        min : 0,
        max : 200,
        prop:'brightness',
        startPoint:100
    },
    {
        min : 0,
        max : 200,
        prop:'contrast',
        startPoint:100
    },
    {
        min : 0,
        max : 200,
        prop:'saturate',
        startPoint:100
    },
    {
        min : 0,
        max : 10,
        prop:'amount',
        startPoint:0
    },
    {
        min : 0,
        max : 200,
        prop:'radius',
        startPoint:0
    },
    {
        min : 0,
        max : 200,
        prop:'threshold',
        startPoint:0
    }
]
