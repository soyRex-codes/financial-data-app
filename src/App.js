import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import Filters from './components/Filters';
import './index.js';

const App = () => {
  // State for stock data, filters, sort configuration, and selected stock ticker
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: [2020, 2024],
    revenue: [0, 5000000000000],
    netIncome: [0, 5000000000000]
  });
  const [sortConfig, setSortConfig] = useState(null);
  const [stockTicker, setStockTicker] = useState("AAPL");

  // Function to fetch data based on the selected ticker
  const fetchData = async (ticker) => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?period=annual&apikey=VYEBfVCBhvFO6upK9ADqrjdWdBJo8bEY`
      );
      console.log(response.data);
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle form submission: prevent default behavior and fetch new data
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(stockTicker);
  };

  // Initially load data for the default ticker (AAPL)
  useEffect(() => {
    fetchData(stockTicker);
  }, []);

  // Sorting functionality remains unchanged
  const onSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  // Filter data based on filters applied by the user
  useEffect(() => {
    const filtered = data.filter(item => {
      const dateYear = parseInt(item.date.split('-')[0]);
      return (
        dateYear >= filters.dateRange[0] &&
        dateYear <= filters.dateRange[1] &&
        item.revenue >= filters.revenue[0] &&
        item.revenue <= filters.revenue[1] &&
        item.netIncome >= filters.netIncome[0] &&
        item.netIncome <= filters.netIncome[1]
      );
    });
    setFilteredData(filtered);
  }, [filters, data]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-xl sm:text-3xl font-bold text-green-800 mb-4 text-center">
          Investors Friend
        </h1>
        <h3 className="text-xl sm:text-xl font-bold text-red-600 mb-4 text-center">
          Watch & Filter Decades of Stock Data, Investing Made Easy
        </h3>

        {/* Dropdown form for selecting a stock */}
        <form onSubmit={handleSubmit} className="mb-4 flex items-center justify-center">
          <label className="mr-2 font-bold text-blue-800" htmlFor="stock-select">
            Select Stock:
          </label>
          <select
            id="stock-select"
            value={stockTicker}
            onChange={(e) => setStockTicker(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="AAPL">Apple (AAPL)</option>
            <option value="META">Meta (META)</option>
            <option value="AMD">Amd (AMD)</option>
            <option value="GOOG">Google (GOOG)</option>
            <option value="MSFT">Microsoft (MSFT)</option>
            <option value="AMZN">Amazon (AMZN)</option>
            <option value="TSLA">Tesla (TSLA)</option>
            <option value="FB">Facebook (FB)</option>
            <option value="NFLX">Netflix (NFLX)</option>
            <option value="NVDA">Nvidia (NVDA)</option>
            <option value="BABA">Alibaba (BABA)</option>
            <option value="INTC">Intel (INTC)</option>
          </select>
          <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>

        <h2 className="text-xl sm:text-1xl font-bold text-blue-800 mb-4">
          Stock Data: {stockTicker}
        </h2>
        <Filters filters={filters} setFilters={setFilters} />
        <div className="overflow-x-auto">
          <Table data={filteredData} onSort={onSort} />
        </div>
      </div>
    </div>
  );
};

export default App;
