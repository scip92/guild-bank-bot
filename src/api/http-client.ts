import axios, {AxiosInstance} from "axios";

const baseUrl = "https://classicguildbankapi.azurewebsites.net/api";

export const createHttpClient = (apiToken: string = null): AxiosInstance => {
    let headers = {};
    if (apiToken) {
        headers = {"Authorization": `Bearer ${apiToken}`}
    }
    const client = axios.create({baseURL: baseUrl, headers});
    client.interceptors.request.use(request => {
        console.log({request});
        return request
    });
    return client;
};
