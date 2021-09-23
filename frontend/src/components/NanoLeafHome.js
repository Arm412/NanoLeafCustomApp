import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import QueueMode from "./QueueMode";
import RandomMode from "./RandomMode";
import ManualMode from "./ManualMode";

const METHODS = {
    GET: "GET",
    POST: "POST"
}

export const NanoLeafHome = () => {
    const [effectsLoaded, setEffectsLoaded] = useState(true);
    const [updatingState, setUpdatingState] = useState(true);
    const [nanoState, setNanoState] = useState('MANUAL');
    const effectsList = useRef([]);

    useEffect(() => {
        const getFromNanoLeaf = async () => {
            sendCommand("/getNanoLeafData", METHODS.GET)
			.then((effectListJson) => {
				effectsList.current = effectListJson;
				setEffectsLoaded(true);
			})
			.catch((message) => {
				console.log(message);
			});
        }
        getFromNanoLeaf();
    }, [])

    useEffect(() => {
        // Did this to fix console warning
        if (effectsLoaded) {
            console.log(effectsList.current);
        }
	}, [effectsLoaded]);

    useEffect(() => {
        const postToNanoleaf = async (expressEndpoint) => {
            if(!updatingState){
                effectsList.current = await sendCommand(expressEndpoint, "POST");
                setEffectsLoaded(true);
            } else {
                console.log(effectsList.current);
            }
        }
        postToNanoleaf("/getCurrentEffect");
    }, [updatingState]);


    // Do things with the config if needed
    const sendCommand = async (url, method) => {
        let data = null;
        if(method === METHODS.POST){
            var config = {
                method: 'post',
                url: url,
                headers: { },
                data : data
            };
            data = await axios(config);
            if (data != null) {
                console.log(data);
            }
        }
        else if(method === METHODS.GET) {
            const data = await axios.get(url, {withCredentials: true});
            console.log(data.data);
            return data.data;
        }
    }

    return (
        <div className="primary-bg-100 pt-16 w-screen">
            <div className="flex-wrap flex w-full lg:flex-nowrap">
                <div className="flex-1 mx-10 text-4xl">
                    <button className="main-btn btn-green w-full" onClick={() => setNanoState("MANUAL")} >MANUAL</button>
                </div>
                <div className="flex-1 mx-10 text-4xl">
                    <button className="main-btn btn-green w-full" onClick={() => setNanoState("RANDOM")} >RANDOM</button>
                </div>
                <div className="flex-1 mx-10 text-4xl">
                    <button className="main-btn btn-green w-full" onClick={() => setNanoState("QUEUE")} >QUEUE</button>
                </div>
            </div>
            {nanoState === "MANUAL" ? 
            <ManualMode /> : null}
            {nanoState === "RANDOM" ?
            <RandomMode /> : null }
            {nanoState === "QUEUE" ?
            <QueueMode /> : null} 
        </div>
    )
}
