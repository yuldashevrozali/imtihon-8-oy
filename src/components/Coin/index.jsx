import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SelectedOptionContext } from '../Context/context';
import './index.css'
import CryptoChart from '../CryptoChart';

const CryptoDetails = () => {
    const { id } = useParams();
    const { selectedOption } = useContext(SelectedOptionContext);
    const [cryptoData, setCryptoData] = useState(null);

    useEffect(() => {
        async function getCryptoData() {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
                if (!response.ok) {
                    throw new Error('Server response not OK');
                }
                const data = await response.json();
                setCryptoData(data);
            } catch (error) {
                console.error('Error fetching crypto data: ', error);
            }
        }

        if (id) {
            getCryptoData();
        }
        console.log(cryptoData);
    }, [id, selectedOption]);

    if (!cryptoData) {
        return <div class="loader"></div>;
    }
    console.log(cryptoData);

    function formatMarketCap(marketCap) {
        if (marketCap >= 100000000) {
            return Math.floor(marketCap / 1000000).toLocaleString() + 'm';
        } else if (marketCap >= 1000000) {
            return Math.floor(marketCap / 1000000).toLocaleString() + 'm';
        } else if (marketCap >= 1000) {
            return Math.floor(marketCap / 1000).toLocaleString() + 'k';
        } else {
            return Math.floor(marketCap).toLocaleString();
        }
    }

    return (
        <div className='coins'>
            <div className="coin-left">
                <img src={cryptoData.image.large} alt="img" />
                <h1>{cryptoData.name}</h1>
                <p id='coin-p'>{cryptoData.description.en.slice(0, 188)}</p>

                <p><span>Rank: </span>{cryptoData.market_cap_rank}</p>
                <p><span>Current Price: </span>{cryptoData.market_data.current_price[selectedOption.toLowerCase()]}</p>
                <p><span>Market Cap:</span>{formatMarketCap(cryptoData.market_data.market_cap_change_24h)}</p>

            </div>
            <div className="coin-right">
            <CryptoChart></CryptoChart>
            </div>
        </div>
    );
};

export default CryptoDetails;
