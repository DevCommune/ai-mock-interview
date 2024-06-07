import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen h-full flex items-center">
      {children}
    </div>
  );
};

export default DashboardLayout;
