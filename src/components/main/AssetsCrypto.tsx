import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getAssets } from '../../store/slices/CryptoSlice';


export const AssetsCrypto: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const crypto = useSelector((state: RootState) => state.crypto)
    const isMounted = useRef(false)
    const { assets, status } = crypto;

    useEffect(() => {
        isMounted.current = true;

        if(status === "idle"){
            dispatch(getAssets());
        }

        return () => {
            isMounted.current = false;
        }
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
                assets.slice(0, 2).map((asset) => {
                    return (
                         <div key={asset.id}>
                              <p>{asset.name}</p>
                         </div>
                    )
                })
            )
           }
       </div>
  );
};
