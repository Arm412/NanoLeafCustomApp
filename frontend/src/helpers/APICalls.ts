import axios from 'axios';

const METHODS = {
  GET: 'GET',
  POST: 'POST'
};

export const effectSetClick = (effect: string) => {
  console.log('Inside set Effect with ' + effect);
  const postToNanoleaf = async (expressEndpoint: string) => {
    sendCommand(expressEndpoint, 'POST', {
      effect: effect
    });
  };
  postToNanoleaf('/setCurrentEffect');
};

// Do things with the config if needed
const sendCommand = async (url: string, method: string, body: object) => {
  let data = null;
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
      return data.data;
    }
  } else if (method === METHODS.GET) {
    data = await axios.get(url, { withCredentials: true });
    console.log(data.data);
    return data.data;
  }
};
