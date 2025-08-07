import React from 'react';
import { useTable } from 'react-table';

const LogsTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Date', accessor: 'log_date' },
      { Header: 'Income', accessor: 'income' },
      { Header: 'Food', accessor: 'food' },
      { Header: 'Travel', accessor: 'travel' },
      { Header: 'Shopping', accessor: 'shopping' },
      { Header: 'Daily Needs', accessor: 'daily_needs' },
      { Header: 'Other', accessor: 'other' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="overflow-x-auto w-full p-4">
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg"
      >
        <thead className="bg-gray-100">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-left text-sm text-gray-700">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="px-4 py-2">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="text-sm text-gray-800 hover:bg-gray-50">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-4 py-2">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LogsTable;
