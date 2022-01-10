import React from 'react'

type EffectListProps = {
    effectName: string;
    onEffectClick: Function;
}

const EffectList = (props: EffectListProps) => {
    return (
        <div className='effectDiv text-green-600 cursor-pointer hover:bg-green-900' onClick={() => {props.onEffectClick(props.effectName)}}>
            <div className='flex-1 flex flex-col'>
                <p className='flex-1'></p>
                <p className='flex-1 text-center'>{props.effectName}</p>
                <p className='flex-1'></p>
            </div>
        </div>
    )
}

EffectList.defaultProps = {
    brightness: 'N/A',
    hue: 'N/A',
    saturation: 'N/A',
    colortemp: 'N/A',
    colormode: 'N/A',
    onEffectClick: ()=>{},
}

export default EffectList
