// layout/ProtectedLayout.jsx
import React from "react";
import Sidebar from "../components/SideBar";

const ProtectedLayout = ({ children }) => {
  return (
    <div className="flex lg:block ">
     <Sidebar/>
      <main className="flex-grow p-4 bg-gray-50">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
