import axios, { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';

// Calls the Nanoleaf endpoint that returns the list of effects
export const fetchEffectsList = () => {
    return new Promise<Array<String>>((resolve, reject) => {
        let returnedData:Array<String> = [];
	    axios
        .get(process.env.NANOLEAF_IP + '/api/v1/' + process.env.NANO_TOKEN + '/effects/effectsList', {
            withCredentials: true
        }).then((response: any) => {
		    returnedData = response.data;
            resolve(returnedData);
        }).catch((message: String) => {
		    console.log(message);
            reject();
	    });
    })
}