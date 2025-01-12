import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import Filters from './components/Filters';
import './index.js';

const App = () => {
  /*------------------------------------------------------------------------------------------------
//Initializing features
------------------------------------------------------------------------------------------------ */
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ dateRange: [2020, 2024], revenue: [0, Infinity], netIncome: [0, Infinity] });
  const [sortConfig, setSortConfig] = React.useState(null);

/*------------------------------------------------------------------------------------------------
//SORTING FEATURE
------------------------------------------------------------------------------------------------ */
  const onSort = (key) => {
  let direction = 'ascending'; //This line initializes a variable called direction with the default sorting direction as "ascending".
  /* sortConfig: This is assumed to be an object containing information about the currently active sort, including the column key (sortConfig.key) and its sorting direction (sortConfig.direction).
     sortConfig.key === key: This checks if the currently clicked column (key) matches the column that is already being sorted (sortConfig.key).
     sortConfig.direction === 'ascending': This further checks if the current sorting direction for that column is "ascending".*/
  if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending'; //If the conditions inside the if statement are true (meaning the user clicked on the same column that is already sorted ascending), then the direction variable is set to "descending", effectively switching the sorting direction.
  } //the below code sorts and return sorted data, simply like a template for sorting
  setSortConfig({ key, direction });

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
    return 0;
  });
  setFilteredData(sortedData);
};

/*------------------------------------------------------------------------------------------------
//fetching data from API
------------------------------------------------------------------------------------------------ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=VYEBfVCBhvFO6upK9ADqrjdWdBJo8bEY'
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


  
  /*------------------------------------------------------------------------------------------------
//FILTERS
------------------------------------------------------------------------------------------------ */
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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">Financial Data Filtering App</h1>
        <Filters filters={filters} setFilters={setFilters} />
        <div className="overflow-x-auto">
          <Table data={filteredData} onSort={onSort} />
        </div>
      </div>
    </div>
  );
};

export default App;
