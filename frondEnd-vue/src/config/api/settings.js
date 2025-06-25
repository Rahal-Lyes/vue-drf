
 export const backendURL="https://127.0.0.1/8000";

 

const APIConfig = {
    // baseURL: backendURL + "/api/",
    baseURL:backendURL,
    //timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
};

export default APIConfig;