import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import Filters from './components/Filters';
import './index.js';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ dateRange: [2020, 2024], revenue: [0, Infinity], netIncome: [0, Infinity] });
  const [sortConfig, setSortConfig] = React.useState(null);


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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=VYEBfVCBhvFO6upK9ADqrjdWdBJo8bEY'
        );
        console.log(response.data); // Log API response
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  
  // Apply filters whenever `filters` or `data` changes
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Data Filtering App</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <Table data={filteredData} onSort={onSort} />
    </div>
  );
};

export default App;
