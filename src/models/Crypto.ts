export class Crypto {
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    circulating_supply: number;
    current_price: number;
    fully_diluted_valuation: number;
    high_24h: number;
    id: string;
    image: string;
    last_updated: string;
    low_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    max_supply: number;
    name: string;
    price_change_24h: number;
    price_change_percentage_24h: number;
    roi: null;
    symbol: string;
    total_supply: number;
    total_volume: number;

    constructor(params: {
        ath: number;
        ath_change_percentage: number;
        ath_date: string;
        atl: number;
        atl_change_percentage: number;
        atl_date: string;
        circulating_supply: number;
        current_price: number;
        fully_diluted_valuation: number;
        high_24h: number;
        id: string;
        image: string;
        last_updated: string;
        low_24h: number;
        market_cap: number;
        market_cap_change_24h: number;
        market_cap_change_percentage_24h: number;
        market_cap_rank: number;
        max_supply: number;
        name: string;
        price_change_24h: number;
        price_change_percentage_24h: number;
        roi: null;
        symbol: string;
        total_supply: number;
        total_volume: number;
    }) {
        this.ath = params.ath;
        this.ath_change_percentage = params.ath_change_percentage;
        this.ath_date = params.ath_date;
        this.atl = params.atl;
        this.atl_change_percentage = params.atl_change_percentage;
        this.atl_date = params.atl_date;
        this.circulating_supply = params.circulating_supply;
        this.current_price = params.current_price;
        this.fully_diluted_valuation = params.fully_diluted_valuation;
        this.high_24h = params.high_24h;
        this.id = params.id;
        this.image = params.image;
        this.last_updated = params.last_updated;
        this.low_24h = params.low_24h;
        this.market_cap = params.market_cap;
        this.market_cap_change_24h = params.market_cap_change_24h;
        this.market_cap_change_percentage_24h = params.market_cap_change_percentage_24h;
        this.market_cap_rank = params.market_cap_rank;
        this.max_supply = params.max_supply;
        this.name = params.name;
        this.price_change_24h = params.price_change_24h;
        this.price_change_percentage_24h = params.price_change_percentage_24h;
        this.roi = params.roi;
        this.symbol = params.symbol;
        this.total_supply = params.total_supply;
        this.total_volume = params.total_volume;
    }

}

export class CryptoHistory {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];

    constructor(params: {
        prices: number[][];
        market_caps: number[][];
        total_volumes: number[][];
    }) {
        this.prices = params.prices;
        this.market_caps = params.market_caps;
        this.total_volumes = params.total_volumes;
    }

    get formatPricesDataAreaChart() {
        return this.prices.map((price) => {
            return {
                timestamp: price[0],
                price: price[1]
            }
        })
    }
}

export interface getCryptoParams {
    vs_currency: string;
}

export interface getHistoricalDataParams {
    id: string;
    vs_currency: string;
    days: number;
    precision: number;
}