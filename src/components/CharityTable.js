import React from 'react';
import { useTable } from 'react-table';

const CharityTable = ({ columns, data, onRowClick }) => {

  // Destructure the necessary methods and arrays from useTable hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (

    // Container for the table with a responsive design
    <div className="table-container">
      <table {...getTableProps()} style={{ width: '60%', margin: '0 auto' }}>
        <thead>
          {headerGroups.map(headerGroup => (
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
          {rows.map(row => {
            prepareRow(row);// Prepare the row for rendering
            return (
              // Define row element with an onClick handler that triggers onRowClick with the row as argument
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
