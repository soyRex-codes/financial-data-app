import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === 'dateRange' ? value.split(',').map(Number) : value.split(',').map(Number),
    }));
  };

  return (
    <div className="mb-4 space-y-2">
      <div>
        <label className="block font-bold">Date Range (e.g., 2020,2024):</label>
        <input
          type="text"
          name="dateRange"
          value={filters.dateRange}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-bold">Revenue Range (e.g., 0,500000000):</label>
        <input
          type="text"
          name="revenue"
          value={filters.revenue}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-bold">Net Income Range (e.g., 0,500000000):</label>
        <input
          type="text"
          name="netIncome"
          value={filters.netIncome}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
};

export default Filters;
