import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const NanoLeafHome = () => {
    const [effectsLoaded, setEffectsLoaded] = useState(true);
    const [updatingState, setUpdatingState] = useState(true);
    const effectsList = useRef([]);

    useEffect(() => {
        // Did this to fix console warning
        const fetchEffects = async (expressEndpoint) => {
            if(!effectsLoaded){
                effectsList.current = await sendCommand(expressEndpoint, "GET");
                setEffectsLoaded(true);
            } else {
                console.log(effectsList.current);
            }
        }
        fetchEffects("/getNanoLeafData");
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
        if(method === "POST"){
            
            console.log("POST - URL: " + url);
            console.log("Method: " + method);
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
        else if(method === "GET") {
            
            console.log("GET - URL: " + url);
            console.log("Method: " + method);
            const data = await axios.get(url, {withCredentials: true});
            console.log(data.data);
            return data.data;
        }
        
    }

    return (
        <div>
            <button onClick={() => setEffectsLoaded(false)} >Button</button>
            <button onClick={() => setUpdatingState(false)} >Button</button>
            {effectsLoaded ? 
            <div>
                {effectsList.current.map((effect) => (
							<p key={effect}>
								{effect}
							</p>
						))}
            </div>
             : <p>No Data Displayed</p>} 
        </div>
    )
}
