import React from 'react';
import { useTable } from 'react-table';

// Define the CharityTable functional component
const CharityTable = ({ columns, data, onRowClick }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });// Initialize useTable

  return (
    // Container div for styling the table
    <div className="table-container">
      <table {...getTableProps()} style={{ width: '60%', margin: '0 auto' }}>
        <thead>
          {headerGroups.map(headerGroup => ( //Map over each headerGroup
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ textAlign: 'center', border: '1px solid black' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => { //Map over each row
            prepareRow(row);
            return (
              //Render the row and attach an onClick event handler
              <tr {...row.getRowProps()} onClick={() => onRowClick(row)} style={{ cursor: 'pointer' }}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} style={{ textAlign: 'center', border: '1px solid black' }}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CharityTable;
