//import mongodb from "mongodb";
import { MongoClient } from "mongodb";
import axios, { AxiosRequestConfig } from 'axios';
const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);
  
export const updateEffectsList = async ( updatedList:Array<String> ) => {
    try {
        // Connect the client to the server
        await client.connect();

        const database = client.db("NanoLeafDB");
        const collection = database.collection("Effects");
        const doc = {
            item: "effectList",
            data: updatedList,
        }

        // Establish and verify connection
        const result = await collection.insertOne(doc);
        console.log(result);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export const deleteEffectsList = async () => {
    try {
        // Connect the client to the server
        await client.connect();

        const database = client.db("NanoLeafDB");
        const collection = database.collection("Effects");

        // Establish and verify connection
        const result = await collection.deleteOne({item: "effectList"})
        console.log(result);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

// Calls the Nanoleaf endpoint that returns the list of effects
export const getStoredEffects = async () => {
    let retVal = [];
    try {
        // Connect the client to the server
        await client.connect();

        const database = client.db("NanoLeafDB");
        const collection = database.collection("Effects");

        // Establish and verify connection
        const result = await collection.findOne({item: "effectList"})
        retVal = result?.data;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    return retVal;
}
