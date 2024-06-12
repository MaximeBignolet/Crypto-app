/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssets } from '../../store/slices/CryptoSlice';
import { AppDispatch, RootState } from '../../store/store';
import debounce from 'lodash.debounce';
import { getHistoricalData } from '../../services/Crypto';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Crypto } from '../../models/Crypto';

export const AssetsCrypto: React.FC = () => {
  //Local states
  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [prices, setPrices] = useState<
    {
      id: string;
      prices: {
        timestamp: number;
        price: number;
      }[];
    }[]
  >();
  //States from redux
  const dispatch: AppDispatch = useDispatch();
  const crypto = useSelector((state: RootState) => state.crypto);
  const { assets, status } = crypto;
  const arrayAssetToLocalStorage: Crypto[] = [];
  const [assetsFromLocalStorage, setAssetsFromLocalStorage] = useState<Crypto[]>([]);
  const updatedAssetsArray = assets.slice(0, 2).concat(assetsFromLocalStorage);

  const handleOpenModalAddAsset = () => {
    setOpenModal(!openModal);
  };

  const handleQueryChangeDebounced = useMemo(
    () =>
      debounce((value) => {
        setQuery(value);
      }, 500),
    []
  );

  const handleOnQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleQueryChangeDebounced(e.target.value);
  };

  const onClickAddNewAssetToLocalStorage = (asset: Crypto) => {
    const assetToLocalStorage = assets.find((a) => a.id === asset.id);
    if (assetToLocalStorage) {
      arrayAssetToLocalStorage.push(assetToLocalStorage);
      localStorage.setItem('assets', JSON.stringify(arrayAssetToLocalStorage));
    }
  };

  const getHistoricalPrices = async () => {
    const pricesPromises = updatedAssetsArray.map(async (asset) => {
      const response = await getHistoricalData({
        id: asset.id,
        vs_currency: 'usd',
        days: 180,
        precision: 2
      });
      return { id: asset.id, prices: response.formatPricesDataAreaChart };
    });
    const pricesData = await Promise.all(pricesPromises);
    setPrices(pricesData);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAssets());
    }

    setAssetsFromLocalStorage(JSON.parse(localStorage.getItem('assets') || '[]'));
    getHistoricalPrices();

    return () => {
      handleQueryChangeDebounced.cancel();
    };
  }, [status, dispatch, assets, handleQueryChangeDebounced]);
  return (
    <div>
      <div className="mt-20 flex justify-center">
        <h1 className="relative after:absolute after:bg-primary after:h-0.5 after:w-2/3 after:-bottom-2 after:left-0">
          ASSETS
        </h1>
      </div>
      {status === 'failed' ? (
        <p className="mt-10 text-center text-primary">Erreur dans la récupération de la donnée</p>
      ) : (
        <div className="grid grid-cols-1 gap-10 mt-10">
          {updatedAssetsArray.map((asset) => {
            return (
              <div key={asset.id}>
                <p className="text-primary font-bold text-xl">{asset.name}</p>
                <div className="bg-primary/70 rounded-lg py-7 px-5 mt-2 relative shadow-xl">
                  <p className="text-2xl font-semibold">
                    {asset.current_price.toLocaleString('en')}$
                  </p>
                  <div className="absolute -right-1 top-0 w-1/2 h-full">
                    {prices ? (
                      <ResponsiveContainer>
                        <AreaChart data={prices.find((price) => price.id === asset.id)?.prices}>
                          <defs>
                            <linearGradient
                              id={`chartsGradient${asset.id}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1">
                              <stop
                                offset="5%"
                                stopColor={asset.price_change_24h > 0 ? '#3EDD87' : 'red'}
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="100%"
                                stopColor={asset.price_change_24h > 0 ? '#3EDD87' : 'red'}
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type={'monotone'}
                            dataKey={'price'}
                            stroke={asset.price_change_24h > 0 ? '#3EDD87' : 'red'}
                            fill={`url(#chartsGradient${asset.id})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="bg-red-500">Loading...</p>
                    )}
                  </div>
                  <p className="mt-2">
                    1d change:{' '}
                    <span
                      className={
                        asset.price_change_24h > 0
                          ? 'text-[#3EDD87] font-bold'
                          : 'text-[#F46565] font-bold'
                      }>
                      {asset.price_change_24h > 0 ? '+' : ''}
                    </span>{' '}
                    <span
                      className={
                        asset.price_change_24h > 0
                          ? 'text-[#3EDD87] font-bold'
                          : 'text-[#F46565] font-bold'
                      }>
                      {asset.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
          <div className="bg-[#131024] rounded-lg py-7 px-5 mt-2 shadow-xl border border-gray-600">
            <div className="flex flex-col items-center" onClick={handleOpenModalAddAsset}>
              <p className="rounded-lg border border-gray-500 aspect-square text-gray-500 text-2xl w-10 h-10 flex justify-center items-center">
                +
              </p>
              <p className="mt-2 text-gray-500">New Asset</p>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${!openModal ? 'hidden' : ''} absolute h-full w-full top-0 left-0 overflow-hidden z-10`}
        onClick={() => setOpenModal(false)}></div>
      <div
        className={`absolute bg-[#131024] border border-gray-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-1/2 w-2/3 shadow-xl rounded-lg transition-all ease-in duration-300 ${!openModal ? 'hidden' : ''} overflow-y-scroll`}>
        <div className="flex flex-col items-center justify-center pt-5">
          <p>Add new Asset</p>
          <form className="my-10 flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="asset_name" className="mb-3">
              Find your asset
            </label>
            <input
              type="text"
              id="asset_name"
              className="text-gray-300 bg-gray-700 p-1 rounded-lg"
              onChange={handleOnQueryChange}
            />
          </form>
          {assets
            .filter((asset) => asset.name.toLowerCase().includes(query.toLowerCase()))
            .map((asset) => {
              return (
                <div
                  key={asset.id}
                  className="bg-primary/70 rounded-lg py-7 px-5 mt-2 relative shadow-xl w-[90%] my-5">
                  <div className="flex gap-5 items-baseline">
                    <p className="font-semibold">{asset.name}</p>
                    <p className="mt-2">{asset.current_price.toLocaleString('en')}$</p>
                  </div>
                  <button
                    className="mt-2 bg-white text-gray-800 rounded-lg px-3 py-1"
                    onClick={() => onClickAddNewAssetToLocalStorage(asset)}>
                    Add
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
