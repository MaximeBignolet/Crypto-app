/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Crypto, CryptoHistory, getCryptoParams, getHistoricalDataParams } from '../models/Crypto';
import { CryptoFactory } from '../factory/CryptoFactory';

const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export const getAssetsCrypto = async (params: getCryptoParams): Promise<Crypto[]> => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/coins/markets`,
    params: params,
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-day7eLg4ij2yEBy3qjYMYSnk'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.map((resp: any) => {
      return CryptoFactory.createCryptoFromJson(resp);
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
    throw error;
  }
};

export const getHistoricalData = async (
  params: getHistoricalDataParams
): Promise<CryptoHistory> => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/coins/${params.id}/market_chart`,
    params: params,
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-day7eLg4ij2yEBy3qjYMYSnk'
    }
  };

  try {
    const response: AxiosResponse<CryptoHistory, any> = await axios.request(options);
    return CryptoFactory.createCryptoHistoryFromJson(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
    throw error;
  }
};
