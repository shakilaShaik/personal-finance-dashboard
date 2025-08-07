import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import analyticsApi from "../api/analyticsApi";
import {toast} from "react-toastify";

const AddLog = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    food: "",
    travel: "",
    shopping: "",
    daily_needs: "",
    other: "",
    income: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow only numbers and decimals
    if (/^-?\d*\.?\d*$/.test(value) || value === "") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    return Object.values(formData).every((val) => val !== "" && !isNaN(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all fields with valid numbers.");
      return;
    }

    setSubmitting(true);

    const parsedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
    );

    const data = {
      ...parsedData,
      log_date: format(selectedDate, "yyyy-MM-dd"),
    };

    try {
      const response = await analyticsApi({
        url: "/log",
        method: "post",
        data: data,
      });

      if (response?.data?.msg) {
        toast.success(response.data.msg);
      } else {
        toast.success("Log saved successfully!");
      }

      // Reset form
      setFormData({
        food: "",
        travel: "",
        shopping: "",
        daily_needs: "",
        other: "",
        income: "",
      });
    } catch (error) {
      console.error("Error submitting log:", error);
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.msg ||
        "Failed to save the log. Please try again.";
      toast.error(`❌ ${msg}`);
    } finally {
      setSubmitting(false);
      
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
      {/* Calendar */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-indigo-600 mb-4 text-center">
          Select Log Date
        </h2>
        <DayPicker
          mode="single"
          selected={selectedDate}
           onSelect={(date) => setSelectedDate(date || new Date())} // <-- THIS LINE
          className="text-gray-700"
          modifiersClassNames={{
            selected: "bg-indigo-600 text-white",
            today: "border-indigo-500",
          }}
        />
        <p className="text-sm text-gray-600 mt-2 text-center">
          Selected Date:{" "}
          <span className="font-medium text-indigo-700">
            {format(selectedDate, "PPP")}
          </span>
        </p>
      </div>

      {/* Log Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-[500px] bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
      >
        <h2 className="text-xl font-bold text-indigo-700 mb-6 text-center">
          Add Daily Log
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Food" name="food" value={formData.food} onChange={handleChange} />
          <Input label="Travel" name="travel" value={formData.travel} onChange={handleChange} />
          <Input label="Shopping" name="shopping" value={formData.shopping} onChange={handleChange} />
          <Input label="Daily Needs" name="daily_needs" value={formData.daily_needs} onChange={handleChange} />
          <Input label="Other" name="other" value={formData.other} onChange={handleChange} />
          <Input label="Income" name="income" value={formData.income} onChange={handleChange} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full mt-6 ${
            submitting ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-semibold py-2 px-4 rounded-lg transition`}
        >
          {submitting ? "Saving..." : "Save Log"}
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
        ₹
      </span>
      <input
        type="number"
        step="0.01"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="pl-7 border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={`Here expenditure ${label.toLowerCase()}`}
      />
    </div>
  </div>
);

export default AddLog;
