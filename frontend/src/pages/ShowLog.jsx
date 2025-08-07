import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import ShowLogs from '../components/LogsTable'
import analyticsApi from '../api/analyticsApi'
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { setLogs } from '../redux/logSlice';

const ShowLog = () => {
  const logs = useSelector(state => state.logs.logs); // Assuming you store it here
  const dispatch=useDispatch()


useEffect(() => {
    const fetchingLogs = async () => {
      try {
        const result = await analyticsApi({
          url: '/all-logs',
          method: 'get',
        });
       let  logsFetched= result.data;
        console.log(logs, 'the logs are');
       dispatch(setLogs(logsFetched)); // set logs in Redux

       
        toast.success('Your logs are fetched');
      } catch (error) {
        toast.error('Failed to fetch logs');
        console.error(error);
      }
    };

    fetchingLogs();
  }, []);
useEffect(() => {
  console.log(logs, 'Updated logs from Redux');
}, [logs]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold my-4">Your Logs</h1>
      <ShowLogs data={logs} />
    </div>
  );
};

export default ShowLog;
