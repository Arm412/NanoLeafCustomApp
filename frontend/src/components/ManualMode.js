import React from 'react'
import EffectInfo from './EffectInfo'

const ManualMode = (props) => {
    

    return (
        <div id="manualMode" className="w-full" >
            <div className="flex-1"></div>
            <div className="man-effect-container">
                <div className="effect-scroll">
                { props.effectsList.length > 0 ? <div className="container mx-auto" >{
                    props.effectsList.map((effect) => (
				    <EffectInfo key={effect} effectName={effect} onEffectClick={props.onEffectClick} />
					))}
                    List</div> : <p>No List</p>
                }
                </div>
                <div className="man-effect-desc-div">
                </div>
            </div>
            <div className="flex-1"></div>
        </div>
    )
}

EffectInfo.defaultProps = {
    onEffectClick: ()=>{},
}

export default ManualMode
