import React, { useEffect, useState } from 'react';
import AnalyticsPieChart from '../components/AnalyticsPieChart';
import analyticsApi from '../api/analyticsApi.js'
const Analytics = () => {
  // const [summaryData, setSummaryData] = useState(null);
  const  summaryData={
  "message": "Here is your spending summary from 2025-08-03 to 2025-08-07",
  "summary": {
    "total_income": 2,
    "max_income": 1,
    "food": {
      "total": 2,
      "percentage": 200
    },
    "travel": {
      "total": 2,
      "percentage": 200
    },
    "shopping": {
      "total": 2,
      "percentage": 200
    },
    "daily_needs": {
      "total": 2,
      "percentage": 200
    },
    "other": {
      "total": 2,
      "percentage": 200
    },
    "total_spending": 10
  }
}

  // useEffect(() => {
  //   const fetchSummary = async () => {
  //     try {
  //       const response = await analyticsApi({
  //         url:"/summary",
  //         method:"post",
  //       });
  //       setSummaryData(response.data.summary);
  //     } catch (error) {
  //       console.error('Failed to fetch summary:', error);
  //     }
  //   };

  //   fetchSummary();
  // }, []);

  return (
    <div className="dashboard">
      <AnalyticsPieChart summary={summaryData.summary} />
    </div>
  );
};

export default Analytics;
