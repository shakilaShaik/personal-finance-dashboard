import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const AddLog = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    food: 0,
    travel: 0,
    shopping: 0,
    daily_needs: 0,
    other: 0,
    income: 0,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   await axios.post("http://localhost:8003/api/add-log", {
    //     log_date: selectedDate.toISOString().split("T")[0],
    //     ...formData,
    //   }, { withCredentials: true });

    //   alert("Log added successfully!");
    //   closeModal();
    // } catch (err) {
    //   console.error(err);
    //   alert("Error adding log.");
    // }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Daily Log</h2>

      <Calendar
        onChange={(date) => {
          setSelectedDate(date);
          openModal();
        }}
        value={selectedDate}
        className="mx-auto border rounded-lg shadow-md p-4"
      />

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-bold">Log for {selectedDate.toDateString()}</Dialog.Title>
              <button onClick={closeModal}>
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {["food", "travel", "shopping", "daily_needs", "other", "income"].map((field) => (
                <div key={field}>
                  <label className="block capitalize text-sm mb-1">{field.replace("_", " ")}:</label>
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                    min="0"
                    step="0.01"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AddLog;
