import Astro from "@/components/astro-illus";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen">
      {/* <Astro className="left-10 top-14 pointer-events-none select-none z-20" /> */}
      {children}
    </div>
  );
};

export default DashboardLayout;
