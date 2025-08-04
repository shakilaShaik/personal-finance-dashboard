export default function AddLog() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Add Log</h2>
      <div className="bg-white/5 p-6 rounded-xl shadow-md w-[500px]">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700"
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700"
          />
          <select className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded"
          >
            Add Log
          </button>
        </form>
      </div>
    </div>
  );
}
