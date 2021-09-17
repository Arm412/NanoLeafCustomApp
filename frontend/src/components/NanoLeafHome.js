import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const NanoLeafHome = () => {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [updatingState, setUpdatingState] = useState(true);
    const effectsList = useRef([]);

    useEffect(() => {
        // Did this to fix console warning
        const fetchEffects = async () => {
            if(!dataLoaded){
                effectsList.current = await getNanoLeafData("/getNanoLeafData");
                setDataLoaded(true);
            } else {
                console.log(effectsList.current);
            }
        }
        fetchEffects();
	}, [dataLoaded]);

    useEffect(() => {
        const fetchEffects = async () => {
            if(!dataLoaded){
                effectsList.current = await getNanoLeafData("/getNanoLeafData");
                setDataLoaded(true);
            } else {
                console.log(effectsList.current);
            }
        }
        fetchEffects();
    }, [updatingState])


    // Do things with the config if needed
    const getNanoLeafData = async (url) => {
        const data = await axios.get(url, {withCredentials: true});
        console.log(data.data);
        return data.data;
    }


    return (
        <div>
            <button onClick={() => setDataLoaded(false)} >Button</button>
            <button onClick={() => setUpdatingState(false)} >Button</button>
            {dataLoaded ? 
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
