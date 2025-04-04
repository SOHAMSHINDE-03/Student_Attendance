import React from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";

function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar (Fixed) */}
      <div className="w-64 fixed hidden md:block h-screen">
        <SideNav />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 min-h-screen">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
