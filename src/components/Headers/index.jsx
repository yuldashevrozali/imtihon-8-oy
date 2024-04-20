import React, { useContext, useState, useRef, useEffect } from 'react';
import dropdown from '../../assets/dropdown.svg';
import './index.css';
import { SelectedOptionContext } from '../Context/context';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
    const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext);
    const [data, setdata] = useState([]);

    const handleSelect = (option) => {
        setSelectedOption(option);
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
        const coins = localStorage.getItem('coins');
        const parsedCoins = coins ? JSON.parse(coins) : null;
        setdata(parsedCoins.cryptos);
    };


    const handleCloseModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    function removeclick(index) {
        setdata(prevData => {
            const newData = [...prevData];
            newData.splice(index, 1);
            localStorage.setItem('coins', JSON.stringify({ cryptos: newData }));
            return newData;
        });
    }

    function allremove() {
        setdata([]);
        localStorage.removeItem('coins');
    }
    

    return (
        <>
            <div className="header-top">
                <div className="header-logo">
                    <h1><a href='/'>CRYPTOFOLIO</a></h1>
                </div>
                <div className="header-watchlist">
                    <div className="dropdown">
                        <button className="dropbtn">{selectedOption}<span><img src={dropdown} alt="dropdown" /></span></button>
                        <div className="dropdown-content">
                            <a onClick={() => handleSelect('USD')}>USD</a>
                            <a onClick={() => handleSelect('INR')}>INR</a>
                            <a onClick={() => handleSelect('RUB')}>RUB</a>
                        </div>
                    </div>
                    <button onClick={toggleModal} className='watchlistbtn'>WATCH LIST</button>
                </div>
            </div>
            {isOpen && (
                <div className="modal-container" onClick={handleCloseModal}>
                    <div className="modal-content"  ref={modalRef}>
                        <h2>WATCHLIST</h2>
                        <div className='coins-watchlist'>
                            {data.map((coin, index) => (
                                <div className='coin-block' key={index}>
                                    <img src={coin.coinimg} alt="" />
                                    <h1>{coin.coinprice.toLocaleString()}</h1>
                                    <button onClick={() => removeclick(index)}>remove</button>

                                </div>
                            ))}
                            <button id='allremove' onClick={allremove}>remove all</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
