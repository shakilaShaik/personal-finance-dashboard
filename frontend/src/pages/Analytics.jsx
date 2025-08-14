import React, { useEffect, useState } from 'react';
import AnalyticsPieChart from '../components/AnalyticsPieChart';
import analyticsApi from '../api/analyticsApi.js';

const Analytics = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (!fromDate || !toDate) return;

    const fetchSummary = async () => {
      try {
        const response = await analyticsApi({
          url: "/summary",
          method: "get",
          params: { start_date:fromDate,end_date: toDate }
        });
        setSummaryData(response.data.summary);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      }
    };

    fetchSummary();
  }, [fromDate, toDate]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Expenditure Analytics
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Select a date range to view your spending breakdown
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex flex-col">
            <label
              htmlFor="fromDate"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              From Date
            </label>
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="toDate"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              To Date
            </label>
            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {summaryData ? (
          <div className="mt-6">
            <AnalyticsPieChart summary={summaryData} />
          </div>
        ) : (
          <p className="text-center text-gray-400 italic">
            No data yet — select both dates to see results
          </p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
