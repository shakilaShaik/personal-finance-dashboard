import React from 'react';
// import { useSelector } from 'react-redux';
import ShowLogs from '../components/LogsTable'

const ShowLog = () => {
  // const logs = useSelector(state => state.logs.data); // Assuming you store it here
const logs=[
   {
    log_date: '2025-08-04',
    income: 1,
    food: 1,
    travel: 1,
    shopping: 1,
    daily_needs: 1,
    other: 1,
  },
  {
    log_date: '2025-08-05',
    income: 1,
    food: 1,
    travel: 1,
    shopping: 1,
    daily_needs: 1,
    other: 1,
  },
  {
    log_date: '2025-08-06',
    income: 0,
    food: 0,
    travel: 0,
    shopping: 0,
    daily_needs: 0,
    other: 0,
  },
]
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold my-4">Your Logs</h1>
      <ShowLogs data={logs} />
    </div>
  );
};

export default ShowLog;
