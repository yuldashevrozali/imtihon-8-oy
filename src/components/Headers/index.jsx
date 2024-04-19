import React, { useContext } from 'react';
import dropdown from '../../assets/dropdown.svg';
import './index.css';
import { Link } from 'react-router-dom';
import { SelectedOptionContext } from '../Context/context';

export default function Header() {
    const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext);

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className="header-top">
                <div className="header-logo">
                    <h1>CRYPTOFOLIO</h1>
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
                    <Link to={`/${selectedOption}`} className='watchlistbtn'>watchlist</Link>
                </div>
            </div>
        </>
    );
}
