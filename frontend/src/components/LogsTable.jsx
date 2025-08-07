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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="overflow-x-auto w-full p-4">
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg"
      >
        <thead className="bg-gray-100">
          {headerGroups.map(headerGroup => {
            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr
                key={key}
                {...restHeaderGroupProps}
                className="text-left text-sm text-gray-700"
              >
                {headerGroup.headers.map(column => {
                  const { key, ...restColumnProps } = column.getHeaderProps();
                  return (
                    <th
                      key={key}
                      {...restColumnProps}
                      className="px-4 py-2"
                    >
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map(row => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();

            return (
              <tr
                key={key}
                {...restRowProps}
                className="text-sm text-gray-800 hover:bg-gray-50"
              >
                {row.cells.map(cell => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td
                      key={key}
                      {...restCellProps}
                      className="px-4 py-2"
                    >
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

export default LogsTable;
