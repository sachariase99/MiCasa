import React, { useState } from 'react';
import Cards from '../components/cards';

const Estates = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="mt-28">
      <div className="flex justify-between mx-16 mb-4">
        <h2 className="text-4xl font-semibold">Boliger til salg</h2>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 cursor-pointer"
          >
            <option value="">Vælg filter</option>
            <option value="villa">Villa</option>
            <option value="ejerlejlighed">Ejerlejlighed</option>
            <option value="andelsbolig">Andelsbolig</option>
          </select>
          <select
            value={sort}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md p-2 cursor-pointer"
          >
            <option value="">Sorter efter</option>
            <option value="price_asc">Pris - Stigende</option>
            <option value="price_desc">Pris - Faldende</option>
            <option value="size">Antal kvadratmeter</option>
            <option value="days_desc">Liggetid - Faldende</option>
          </select>
        </div>
      </div>
      <Cards filter={filter} sort={sort} />
    </div>
  );
};

export default Estates;
