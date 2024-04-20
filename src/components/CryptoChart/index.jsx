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

  const getChartData = (range) => {
    switch (range) {
      case '24h':
        return [coinData.market_data.market_cap_change_24h];
      case '7d':
        return [coinData.market_data.price_change_percentage_7d];
      case '14d':
        return [coinData.market_data.price_change_percentage_14d];
      default:
        return [];
    }
  };

  if (!coinData || !coinData.market_data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    options: {
      chart: {
        id: 'basic-line',
      },
      xaxis: {
        categories: ['Last 24 Hours', 'Last 7 Days', 'Last 14 Days'],
      },
    },
    series: [
      {
        name: 'Price Change Percentage',
        data: getChartData(selectedRange),
      },
    ],
  };

  return (
    <div className="crypto-chart">
      <p>Price {selectedRange} in </p>

      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        width="500"
      />

      <div>
        <button onClick={() => setSelectedRange('24h')}>Last 24 Hours</button>
        <button onClick={() => setSelectedRange('7d')}>Last 7 Days</button>
        <button onClick={() => setSelectedRange('14d')}>Last 14 Days</button>
      </div>
    </div>
  );
}
