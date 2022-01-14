import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { QueueMode, RandomMode, ManualMode } from './index';

export const EffectContext = React.createContext<string | undefined>(undefined);

const METHODS = {
  GET: 'GET',
  POST: 'POST'
};

const NanoLeafHome = () => {
  const [effectsLoaded, setEffectsLoaded] = useState(true);
  const [updatingState, setUpdatingState] = useState(false);
  const [nanoState, setNanoState] = useState('NONE');
  const effectsList = useRef([]);
  const selectedEffect = useRef('');

  const effectSetClick = (e: string) => {
    selectedEffect.current = e;
    console.log(selectedEffect.current);
    setUpdatingState(true);
  };

  const updateEffects = () => {
    const updateEffectsList = async () => {
      sendCommand('/updateEffectsList', METHODS.POST, {})
        .then((effectListJson) => {
          effectsList.current = effectListJson;
          setEffectsLoaded(true);
        })
        .catch((message) => {
          console.log(message);
        });
    };
    updateEffectsList();
  };

  useEffect(() => {
    const getFromNanoLeaf = async () => {
      sendCommand('/getNanoLeafData', METHODS.GET, {})
        .then((effectListJson) => {
          effectsList.current = effectListJson;
          setEffectsLoaded(true);
        })
        .catch((message) => {
          console.log(message);
        });
    };
    getFromNanoLeaf();
  }, []);

  useEffect(() => {
    // Did this to fix console warning
    if (effectsLoaded) {
      console.log(effectsList.current);
    }
  }, [effectsLoaded]);

  useEffect(() => {
    const postToNanoleaf = async (expressEndpoint: string) => {
      if (updatingState) {
        console.log('Updating State: ' + selectedEffect.current);
        sendCommand(expressEndpoint, 'POST', {
          effect: selectedEffect.current
        });
        setUpdatingState(false);
      } else {
        console.log('Update Ended');
      }
    };
    postToNanoleaf('/setCurrentEffect');
  }, [updatingState]);

  // Do things with the config if needed
  const sendCommand = async (url: string, method: string, body: object) => {
    let data = null;
    console.log(selectedEffect.current);
    if (method === METHODS.POST) {
      let config = {
        method: 'post',
        url: url,
        data: body,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      console.log(config);
      data = await axios.post(url, body);
      if (data != null) {
        console.log(data);
      }
    } else if (method === METHODS.GET) {
      data = await axios.get(url, { withCredentials: true });
      console.log(data.data);
      return data.data;
    }
  };

  return (
    <EffectContext.Provider value={selectedEffect.current}>
      <div className="primary-bg-100 w-screen">
        <div className="flex-wrap flex w-full lg:flex-nowrap py-16">
          <div className="flex-1 mx-10 text-4xl">
            <button className="main-btn" onClick={() => setNanoState('MANUAL')}>
              MANUAL
            </button>
          </div>
          <div className="flex-1 mx-10 text-4xl">
            <button className="main-btn" onClick={() => setNanoState('RANDOM')}>
              RANDOM
            </button>
          </div>
          <div className="flex-1 mx-10 text-4xl">
            <button className="main-btn" onClick={() => setNanoState('QUEUE')}>
              QUEUE
            </button>
          </div>
        </div>
        {nanoState === 'MANUAL' ? (
          <ManualMode
            effectsList={effectsList.current}
            onEffectClick={effectSetClick}
            selectedEffect={selectedEffect.current}
          />
        ) : null}
        {nanoState === 'RANDOM' ? <RandomMode /> : null}
        {nanoState === 'QUEUE' ? <QueueMode /> : null}
        <button
          id="fetchBtn"
          className="btn-blue"
          onClick={() => updateEffects()}
        >
          Fetch Effects
        </button>
      </div>
    </EffectContext.Provider>
  );
};

export default NanoLeafHome;
