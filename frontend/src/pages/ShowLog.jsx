export default function ShowLog() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Transaction Logs</h2>
      <div className="bg-white/5 p-4 rounded-xl shadow-md w-full">
        {/* Dummy Table */}
        <table className="w-full text-left text-sm text-white">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2">Title</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Type</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Map your logs here */}
            <tr>
              <td className="py-2">Salary</td>
              <td className="py-2">₹50,000</td>
              <td className="py-2 text-green-400">Income</td>
              <td className="py-2">2025-07-29</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
