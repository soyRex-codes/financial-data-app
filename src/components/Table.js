import React from 'react';
const Table = ({ data, onSort, sortConfig }) => {
  const handleSort = (key) => {
    onSort(key);
  };

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 cursor-pointer" onClick={() => handleSort('date')}>
            Date ↑↓ {sortConfig?.key === 'date' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </th>
          <th className="border p-2 cursor-pointer" onClick={() => handleSort('revenue')}>
            Revenue ↑↓ {sortConfig?.key === 'revenue' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </th>
          <th className="border p-2 cursor-pointer" onClick={() => handleSort('netIncome')}>
            Net Income ↑↓ {sortConfig?.key === 'netIncome' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </th>
          <th className="border p-2 cursor-pointer" onClick={() => handleSort('grossProfit')}>
            Gross Profit ↑↓ {sortConfig?.key === 'grossProfit' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </th>
          <th className="border p-2 cursor-pointer" onClick={() => handleSort('eps')}>
            EPS ↑↓ {sortConfig?.key === 'eps' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </th>
          <th className="border p-2 cursor-pointer" onClick={() => handleSort('operatingIncome')}>
            Operating Income ↑↓ {sortConfig?.key === 'operatingIncome' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.date}>
            <td className="border p-2">{item.date}</td>
            <td className="border p-2">{item.revenue.toLocaleString()}</td>
            <td className="border p-2">{item.netIncome.toLocaleString()}</td>
            <td className="border p-2">{item.grossProfit.toLocaleString()}</td>
            <td className="border p-2">{item.eps}</td>
            <td className="border p-2">{item.operatingIncome.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;