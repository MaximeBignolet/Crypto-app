/* eslint-disable @typescript-eslint/no-explicit-any */
import { Crypto, CryptoHistory } from '../models/Crypto';

export class CryptoFactory extends Crypto {
  static createCryptoFromJson(json: Record<string, any>): Crypto {
    return new Crypto({
      ath: json.ath,
      ath_change_percentage: json.ath_change_percentage,
      ath_date: json.ath_date,
      atl: json.atl,
      atl_change_percentage: json.atl_change_percentage,
      atl_date: json.atl_date,
      circulating_supply: json.circulating_supply,
      current_price: json.current_price,
      fully_diluted_valuation: json.fully_diluted_valuation,
      high_24h: json.high_24h,
      id: json.id,
      image: json.image,
      last_updated: json.last_updated,
      low_24h: json.low_24h,
      market_cap: json.market_cap,
      market_cap_change_24h: json.market_cap_change_24h,
      market_cap_change_percentage_24h: json.market_cap_change_percentage_24h,
      market_cap_rank: json.market_cap_rank,
      max_supply: json.max_supply,
      name: json.name,
      price_change_24h: json.price_change_24h,
      price_change_percentage_24h: json.price_change_percentage_24h,
      roi: json.roi,
      symbol: json.symbol,
      total_supply: json.total_supply,
      total_volume: json.total_volume,
      prices: json.prices
    });
  }
  static createCryptoHistoryFromJson(json: Record<string, any>): CryptoHistory {
    return new CryptoHistory({
      prices: json.prices,
      market_caps: json.market_caps,
      total_volumes: json.total_volumes
    });
  }
}
