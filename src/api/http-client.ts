import axios, {AxiosInstance} from "axios";

const baseUrl = "https://classicguildbank-apim.azure-api.net/api";

export const createHttpClient = (apiToken: string = null): AxiosInstance => {
    let headers = {};
    if (apiToken) {
        headers = {"Authorization": `Bearer ${apiToken}`}
    }
    const client = axios.create({baseURL: baseUrl, headers});
    client.interceptors.request.use(request => {
        console.log(`[${new Date().toISOString()}] Request: ${request.url}`);
        return request
    });
    client.interceptors.response.use(response => {
        console.log(`[${new Date().toISOString()}] Response: ${response.status}`);
        return response;
    });
    return client;
};
