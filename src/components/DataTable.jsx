import React, { useEffect, useState } from 'react';
import { Table, Input, Center, Pagination as MantinePagination } from '@mantine/core';
import { loadData } from '../utils/loadData';
import { aggregateByYear } from '../utils/aggregateByYear';
import { aggregateByCrop } from '../utils/aggregateByCrop';

const DataTable = () => {
  const [yearAggregates, setYearAggregates] = useState([]);
  const [cropAggregates, setCropAggregates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterYear, setFilterYear] = useState('');
  const [filterCrop, setFilterCrop] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadData();
      setYearAggregates(aggregateByYear(data));
      setCropAggregates(aggregateByCrop(data));
    };

    fetchData();
  }, []);

  const sortedData = (data) => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredYearAggregates = yearAggregates.filter(item => item.year.includes(filterYear));
  const filteredCropAggregates = cropAggregates.filter(item => item.crop.toLowerCase().includes(filterCrop.toLowerCase()));

  const currentYearAggregates = sortedData(filteredYearAggregates).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const currentCropAggregates = sortedData(filteredCropAggregates).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <h1>Yearly Aggregates</h1>
      <Input
        placeholder="Filter by Year"
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
        className="input"
      />
      <Table className="table" highlightOnHover>
        <thead>
          <tr>
            <th onClick={() => handleSort('year')}>Year</th>
            <th onClick={() => handleSort('maxCrop')}>Crop with Maximum Production</th>
            <th onClick={() => handleSort('minCrop')}>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {currentYearAggregates.map((item, index) => (
            <tr key={index}>
              <td>{item.year}</td>
              <td>{item.maxCrop}</td>
              <td>{item.minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Center className="center">
        <MantinePagination
          page={currentPage}
          onChange={paginate}
          total={Math.ceil(filteredYearAggregates.length / itemsPerPage)}
        />
      </Center>

      <h1 style={{ marginTop: '40px' }}>Crop Aggregates</h1>
      <Input
        placeholder="Filter by Crop"
        value={filterCrop}
        onChange={(e) => setFilterCrop(e.target.value)}
        className="input"
      />
      <Table className="table" highlightOnHover>
        <thead>
          <tr>
            <th onClick={() => handleSort('crop')}>Crop</th>
            <th onClick={() => handleSort('averageYield')}>Average Yield between 1950-2020</th>
            <th onClick={() => handleSort('averageCultivationArea')}>Average Cultivation Area between 1950-2020</th>
          </tr>
        </thead>
        <tbody>
          {currentCropAggregates.map((item, index) => (
            <tr key={index}>
              <td>{item.crop}</td>
              <td>{item.averageYield}</td>
              <td>{item.averageCultivationArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Center className="center">
        <MantinePagination
          page={currentPage}
          onChange={paginate}
          total={Math.ceil(filteredCropAggregates.length / itemsPerPage)}
        />
      </Center>
    </div>
  );
};

export default DataTable;