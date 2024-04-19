import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import eye from '../../assets/eye.svg';
import left from '../../assets/left.svg';
import right from '../../assets/right.svg';
import { useNavigate } from 'react-router-dom';
import { SelectedOptionContext } from '../Context/context';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';

export default function Currency() {
    const { selectedOption } = useContext(SelectedOptionContext);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        async function getCoinData() {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedOption}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`);
                if (!response.ok) {
                    throw new Error('Server response not OK');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getCoinData();
    }, [selectedOption, page]);

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

    const handleCoinClick = (coin) => {
        navigate(`/crypto/${coin.id}`);
        console.log(49, coin);

        const coinInfo = {
            coinimg: coin.image,
            coinprice: coin.current_price
        };

        let coinsData = localStorage.getItem("coins");
        let parsedCoinsData = coinsData ? JSON.parse(coinsData) : {};

        if (!parsedCoinsData.cryptos) {
            parsedCoinsData.cryptos = [];
        }

        parsedCoinsData.cryptos.push(coinInfo);

        localStorage.setItem("coins", JSON.stringify(parsedCoinsData));
    };




    return (
        <>
            {!data ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className="header-bottom">
                        <div className='hello'>
                            <h1>CRYPTOFOLIO WATCH LIST</h1>
                        </div>

                        <p>Get all the Info regarding your favorite Crypto Currency</p>

                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={50}
                            slidesPerView={3}
                            autoplay={{ delay: 2000, disableOnInteraction: true }}
                            loop={true}
                        >
                            {data.map((coin) => (
                                <SwiperSlide key={coin.id}>
                                    <div onClick={() => navigate(`/crypto/${coin.id}`)} className='sliders'>
                                        <img src={coin.image} alt={coin.name} />
                                        <div className='sliders-flex'>
                                            <h2>{coin.symbol.toUpperCase()}</h2>

                                            <p style={{ color: coin.price_change_percentage_24h_in_currency < 0 ? 'red' : '#0ECB81' }}>
                                                {coin.price_change_percentage_24h_in_currency.toFixed(1)}%
                                            </p>
                                        </div>

                                        <h1>{selectedOption === 'USD' ? '$' : selectedOption === 'INR' ? '₹' : '₽'}{coin.current_price}</h1>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>

                    <div className="currency">
                        <div className="currency-flex">
                            <h1>Cryptocurrency Prices by Market Cap</h1>
                            <div className="currency-input">
                                <input type="text" placeholder='Search For a Crypto Currency..' />
                            </div>
                            <div>
                                <div className="table-top">
                                    <p id='coin' >Coin</p>
                                    <div className="table-flex" >
                                        <p>Price</p>
                                        <p>24h Change</p>
                                        <p>Market Cap</p>
                                    </div>
                                </div>
                                {data && data.map((coin) => (
                                    <div key={coin.id} onClick={() => handleCoinClick(coin)} className="table-bottom">
                                        <img src={coin.image} alt="coin.image" />
                                        <div className="table-coin">
                                            <h1>{coin.symbol}</h1>
                                            <p>{coin.name}</p>
                                        </div>
                                        <div className="table-prices">
                                            <p id="coin-price">{selectedOption === 'USD' ? '$' : selectedOption === 'INR' ? '₹' : '₽'}{coin.current_price}</p>
                                            <p className={coin.price_change_percentage_24h_in_currency.toString().startsWith('-') ? 'red' : 'blue'}>
                                                <img src={eye} alt="" />
                                                {coin.price_change_percentage_24h_in_currency.toFixed(1)}%
                                            </p>
                                            <p id="coin-price1" >{formatMarketCap(coin.market_cap)}</p>

                                        </div>
                                    </div>
                                ))}
                                <div className='next-slide'>
                                    <ul>
                                        <li><img src={left} alt="" /></li>
                                        {[...Array(10)].map((_, index) => (
                                            <li key={index} onClick={() => setPage(index + 1)}>{index + 1}</li>
                                        ))}
                                        <li><img src={right} alt="" /></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            )}


        </>


    );
}
