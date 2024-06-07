import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getAssets } from '../../store/slices/CryptoSlice';
import { getHistoricalData } from '../../services/Crypto';
import { Area, AreaChart } from 'recharts';
import { CryptoHistory } from '../../models/Crypto';


export const AssetsCrypto: React.FC = () => {
    const [historyPrices, setHistoryPrices] = useState<CryptoHistory>();
    const dispatch: AppDispatch = useDispatch();
    const crypto = useSelector((state: RootState) => state.crypto)
    const { assets, status } = crypto;

    useEffect(() => {
        if(status === "idle"){
            dispatch(getAssets());
        }
        (async function getHistoricalDataFunc(){
            const prices = await getHistoricalData({ id: 'bitcoin', vs_currency: 'usd', days: 365, precision: 2 });
            setHistoryPrices(prices);
        })()
    },[status, dispatch])
    
  return (
       <div>

            <div className='mt-20 flex justify-center'>
                 <h1 className='relative after:absolute after:bg-primary after:h-0.5 after:w-2/3 after:-bottom-2 after:left-0'>ASSETS</h1>
            </div>
            {
            status === "failed" ? (
                 <p>Erreur dans la récupération de la donnée</p>
            ) : (
                 <div className='grid grid-cols-1 mt-10'>
                      {assets.slice(0, 1).map((asset) => {
                    return (
                         <div key={asset.id}>
                              <p className='text-primary font-bold text-xl'>{asset.name}</p>
                              <div className='bg-primary rounded-lg p-5 mt-5 relative'>
                                   <p className='text-2xl font-semibold'>
                                        {asset.current_price}$
                                   </p>
                                   <div className='absolute right-0 top-0'>
                                        <AreaChart 
                                             data={historyPrices?.formatPricesDataAreaChart} 
                                             width={150}
                                             height={80}>
                                             <defs>
                                                  <linearGradient id="chartsGradient" x1="0" y1="0" x2="0" y2="1">
                                                       <stop offset="5%" stopColor={asset.price_change_24h > 0 ? "#3EDD87" : 'red'} stopOpacity={0.8}/>
                                                       <stop offset="95%" stopColor={asset.price_change_24h > 0 ? "#3EDD87" : 'red'} stopOpacity={0}/>
                                                  </linearGradient>
                                             </defs>
                                             { historyPrices ?  <Area type={'monotone'} dataKey={'price'} stroke={asset.price_change_24h > 0 ? "#3EDD87" : 'red'} fill="url(#chartsGradient)"/> : ''}
                                        </AreaChart>
                                   </div>
                                   <p>
                                        1d change: <span className={asset.price_change_24h > 0 ? 'text-[#3EDD87] font-bold' : 'text-[#F46565] font-bold'}>{asset.price_change_24h > 0 ? '+' : '-'}</span> <span className={asset.price_change_24h > 0 ? 'text-[#3EDD87] font-bold' : 'text-[#F46565] font-bold'}>{asset.price_change_percentage_24h.toFixed(2)}%
                                        </span>
                                   </p>
                              </div>
                         </div>
                    )
                    })}
                 </div>
            )
           }
       </div>
  );
};
