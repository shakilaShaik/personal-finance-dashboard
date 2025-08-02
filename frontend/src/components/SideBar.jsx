import { NavLink } from 'react-router-dom';
import { 
  FiPlusCircle, 
  FiList, 
  FiPieChart, 
  FiDollarSign,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';

const Sidebar = () => {
  const navItems = [
    { path: "/add-expense", icon: <FiPlusCircle size={20} />, label: "Add Expense" },
    { path: "/expenses", icon: <FiList size={20} />, label: "Expense Log" },
    { path: "/analytics", icon: <FiPieChart size={20} />, label: "Analytics" },
    { path: "/settings", icon: <FiSettings size={20} />, label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600">FinanceDash</h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-4 py-3 rounded-lg transition-all
              ${isActive 
                ? 'bg-indigo-50 text-indigo-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer/Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50">
          <FiLogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;