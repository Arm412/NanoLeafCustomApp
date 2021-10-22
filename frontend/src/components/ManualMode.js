import React from 'react'
import EffectList from './EffectList'

const ManualMode = (props) => {
    return (
        <div id="manualMode" className="w-full" >
            <div className="flex-1"></div>
            <div className="man-effect-container">
                <div className="effect-scroll">
                { props.effectsList.length > 0 ? <div className="container mx-auto" >{
                    props.effectsList.map((effect) => (
				    <EffectList key={effect} effectName={effect} onEffectClick={props.onEffectClick} />
					))}
                    List</div> : <p>No List</p>
                }
                </div>
                <div className="man-effect-desc-div">
                    <h1 className="text-indigo-400 text-center text-lg">{props.selectedEffect}</h1>
                </div>
            </div>
            <div className="flex-1"></div>
        </div>
    )
}

EffectList.defaultProps = {
    effectsList: [],
    onEffectClick: ()=>{},
}

export default ManualMode
