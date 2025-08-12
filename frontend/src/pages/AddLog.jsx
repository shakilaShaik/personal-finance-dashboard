import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import analyticsApi from "../api/analyticsApi";
import { toast } from "react-toastify";

const MAX_VALUE = 10000000;
const AMOUNT_REGEX = /^\d{0,7}(\.\d{0,2})?$/;

const AddLog = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loggedDates, setLoggedDates] = useState([]);
  const [formData, setFormData] = useState({
    food: "",
    travel: "",
    shopping: "",
    daily_needs: "",
    other: "",
    income: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch all logged dates once on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await analyticsApi.get("/logged-dates");
        setLoggedDates(
          res.data.logged_dates.map((d) => {
            const [year, month, day] = d.split("-").map(Number);
            return new Date(year, month - 1, day); // local midnight
          })
        );
      } catch (err) {
        console.error("Failed to fetch logged dates", err);
      }
    })();
  }, []);

  // If a logged date is clicked, fetch that log & prefill
  useEffect(() => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const isLogged = loggedDates.some(
      (d) => format(d, "yyyy-MM-dd") === dateStr
    );

    if (isLogged) {
      (async () => {
        try {
          const res = await analyticsApi.get(`/log/${dateStr}`);
          const { food, travel, shopping, daily_needs, other, income } =
            res.data;
          setFormData({
            food: food?.toString() || "",
            travel: travel?.toString() || "",
            shopping: shopping?.toString() || "",
            daily_needs: daily_needs?.toString() || "",
            other: other?.toString() || "",
            income: income?.toString() || "",
          });
        } catch (err) {
          console.error("Failed to fetch log for date", err);
        }
      })();
    } else {
      setFormData({
        food: "",
        travel: "",
        shopping: "",
        daily_needs: "",
        other: "",
        income: "",
      });
    }
  }, [selectedDate, loggedDates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setFormData((p) => ({ ...p, [name]: "" }));
      return;
    }
    if (!AMOUNT_REGEX.test(value)) return;

    const numericValue = Number(value);
    if (!Number.isFinite(numericValue) || numericValue < 0) return;
    if (numericValue > MAX_VALUE) {
      toast.warn(`Max allowed value is ₹${MAX_VALUE.toLocaleString()}`);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () =>
    Object.values(formData).every(
      (val) => val !== "" && Number.isFinite(Number(val))
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all fields with valid numbers.");
      return;
    }
    setSubmitting(true);

    const payload = {
      ...Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, parseFloat(v)])
      ),
      log_date: format(selectedDate ?? new Date(), "yyyy-MM-dd"),
    };

    const dateStr = payload.log_date;
    const isLogged = loggedDates.some(
      (d) => format(d, "yyyy-MM-dd") === dateStr
    );

    // normalize date to local midnight
    const normalizedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    try {
      if (isLogged) {
        const upd = await analyticsApi.put("/update-log", payload);
        toast.success(upd?.data?.msg || "Log updated successfully!");
      } else {
        const res = await analyticsApi.post("/log", payload);
        toast.success(res?.data?.msg || "Log saved successfully!");
        setLoggedDates((prev) => [...prev, normalizedDate]);
      }
    } catch (err) {
      console.error("Error saving log:", err);
      toast.error(
        err?.response?.data?.detail ||
          "Failed to save the log. Please try again."
      );
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
          onSelect={(date) => setSelectedDate(date || new Date())}
          modifiers={{
            logged: loggedDates,
          }}
          modifiersClassNames={{
            selected: "bg-indigo-600 text-white",
            logged: "bg-green-200 rounded-full",
            today: "border-indigo-500",
          }}
          className="text-gray-700"
        />
        <p className="text-sm text-gray-600 mt-2 text-center">
          Selected Date:{" "}
          <span className="font-medium text-indigo-700">
            {format(selectedDate ?? new Date(), "PPP")}
          </span>
        </p>
      </div>

      {/* Log Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-[520px] bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
      >
        <h2 className="text-xl font-bold text-indigo-700 mb-6 text-center">
          {loggedDates.some(
            (d) =>
              format(d, "yyyy-MM-dd") ===
              format(selectedDate, "yyyy-MM-dd")
          )
            ? "Update Log"
            : "Add Daily Log"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Food"
            name="food"
            value={formData.food}
            onChange={handleChange}
          />
          <Input
            label="Travel"
            name="travel"
            value={formData.travel}
            onChange={handleChange}
          />
          <Input
            label="Shopping"
            name="shopping"
            value={formData.shopping}
            onChange={handleChange}
          />
          <Input
            label="Daily Needs"
            name="daily_needs"
            value={formData.daily_needs}
            onChange={handleChange}
          />
          <Input
            label="Other"
            name="other"
            value={formData.other}
            onChange={handleChange}
          />
          <Input
            label="Income"
            name="income"
            value={formData.income}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full mt-6 ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
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
        type="text"
        inputMode="decimal"
        max="10000000"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="pl-7 border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  </div>
);

export default AddLog;
