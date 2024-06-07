/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Crypto } from "../models/Crypto";
import { CryptoFactory } from "../factory/CryptoFactory";

const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

interface Params {
    vs_currency: string;
}


export const getAssetsCrypto = async (params: Params): Promise<Crypto[]> => {
    const options = {
        method: 'GET',
        url: `${baseUrl}/coins/markets`,
        params: params,
        headers: {
            accept: 'application/json', 'x-cg-demo-api-key': 'CG-day7eLg4ij2yEBy3qjYMYSnk'
        }
    }

    const response = await axios.request(options);
    return response.data.map((resp: any) => {
        return CryptoFactory.createCryptoFromJson(resp);
    })
};

