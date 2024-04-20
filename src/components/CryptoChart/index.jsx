import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router-dom';

export default function CryptoChart() {
  const [coinData, setCoinData] = useState(null);
  const [selectedRange, setSelectedRange] = useState('24h');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=USD&days=${selectedRange}`);
        if (!response.ok) {
          throw new Error('Server response not OK');
        }
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, selectedRange]);

  const getChartData = () => {
    if (!coinData || !coinData.prices) return [];
    return coinData.prices.map(([time, value]) => ({ x: time, y: value }));
  };

  if (!coinData) {
    return <div>Loading...</div>;
  }

  const chartData = getChartData();

  const options = {
    chart: {
      type: 'line',
    },
    xaxis: {
      type: 'datetime',
    },
  };

  return (
    <div className="crypto-chart">
      <h2>Cryptocurrency Chart</h2>
      <p>Price Changes for the Last {selectedRange}</p>

      <Chart
        options={options}
        series={[{ data: chartData }]}
        type="line"
        width={800}
      />

      <div className="button-group">
        <button className={selectedRange === '24h' ? 'active' : ''} onClick={() => setSelectedRange('24h')}>Last 24 Hours</button>
        <button className={selectedRange === '7d' ? 'active' : ''} onClick={() => setSelectedRange('7d')}>Last 7 Days</button>
        <button className={selectedRange === '14d' ? 'active' : ''} onClick={() => setSelectedRange('14d')}>Last 14 Days</button>
      </div>
    </div>
  );
}
