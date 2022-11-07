import Pocketbase from 'pocketbase';

/*
* A singleton to access pocketbase instance
*/
export class PocketbaseClient {
    private static instance: PocketbaseClient;
    public client: Pocketbase;

    constructor() {
        this.client = new Pocketbase("http://localhost:8090");
        this.client.beforeSend = (url, reqConfig) => {
            delete reqConfig.signal;
            return reqConfig;
        }
    }

    public static getInstance(): PocketbaseClient {
        if(!PocketbaseClient.instance) {
            PocketbaseClient.instance = new PocketbaseClient();
        }

        return PocketbaseClient.instance;
    }
}