import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === 'dateRange' ? value.split(',').map(Number) : value.split(',').map(Number),
    }));
  };
/*----------------------------------------------------------------------------------------------------
Input field for Date range, Revenue Range, NetIncome Range
-----------------------------------------------------------------------------------------------------*/
  return (
    <div className="mb-3 space-y-2 bg-white border border-gray-300 rounded-lg p-4">
      <div>
      <label className="block text-sm font-medium text-gray-700">Date Range (e.g., 2020,2024):</label>
        <input
          type="text"
          name="dateRange"
          value={filters.dateRange}
          onChange={handleInputChange}
          className="bg-green-50 border border-green-500 p-2 rounded-lg w-50%" //input field Green
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Revenue Range (e.g., 0,500000000):</label>
        <input
          type="text"
          name="revenue"
          value={filters.revenue}
          onChange={handleInputChange}
          className="bg-green-50 border border-green-500 p-2 rounded-lg w-50%"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Net Income Range (e.g., 0,500000000):</label>
        <input
          type="text"
          name="netIncome"
          value={filters.netIncome}
          onChange={handleInputChange}
          className="bg-green-50 border border-green-500 p-2 rounded-lg w-50%"
        />
      </div>
    </div>
  );
};

export default Filters;
