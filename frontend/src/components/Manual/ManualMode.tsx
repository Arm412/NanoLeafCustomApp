import React, { useContext, useState, useEffect } from 'react';
import EffectList from '../EffectList';
import { EffectContext } from '../NanoLeafHome';

type ManualModeProps = {
  effectsList: string[];
  //onEffectClick: Function;
  selectedEffect: string;
};

const ManualMode = (props: ManualModeProps) => {
  const [selectedEffect, setSelectedEffect] = useState('');

  useEffect(() => {
    console.log(selectedEffect);
  }, [selectedEffect]);

  return (
    <div className="manual-container">
      <div id="manualMode" className="w-full">
        <div className="flex-1 center-flex"></div>
        <div className="man-effect-container">
          <div className="effect-scroll">
            {props.effectsList.length > 0 ? (
              <div className="container mx-auto">
                {props.effectsList.map((effect) => (
                  <EffectList
                    key={effect}
                    effectName={effect}
                    onEffectClick={() => setSelectedEffect(effect)}
                  />
                ))}
              </div>
            ) : (
              <p>No effects to list</p>
            )}
          </div>
          <div className="man-effect-desc-div">
            <h1 className="text-white text-center text-lg">{selectedEffect}</h1>
            <button id="setActiveBtn">Set as Active</button>
          </div>
        </div>
        <div className="flex-1 center-flex"></div>
      </div>
    </div>
  );
};

export default ManualMode;
