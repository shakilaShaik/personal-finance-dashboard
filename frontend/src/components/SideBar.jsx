import { NavLink } from "react-router-dom";
import { PlusCircle, List, BarChart3 } from "lucide-react";
import { FcBullish } from "react-icons/fc";

export default function Sidebar() {
  return (
    <div className="w-64  hidden min-h-screen bg-white border-r border-gray-200 p-6 shadow-md lg:block">
      <h1 className="text-2xl font-bold mb-10 text-gray-800 tracking-wide text-center flex">
        <FcBullish /> FinTrack
      </h1>

      <nav className="space-y-4 text-[16px] font-medium ">
        <NavLink
          to="/add-log"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
              isActive ? "bg-blue-200 text-blue-800 font-semibold" : "text-gray-700"
            }`
          }
        >
          <PlusCircle size={20} /> Add Log
        </NavLink>

        <NavLink
          to="/show-logs"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
              isActive ? "bg-blue-200 text-blue-800 font-semibold" : "text-gray-700"
            }`
          }
        >
          <List size={20} /> Show Logs
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
              isActive ? "bg-blue-200 text-blue-800 font-semibold" : "text-gray-700"
            }`
          }
        >
          <BarChart3 size={20} /> Analytics
        </NavLink>
      </nav>
    </div>
  );
}
