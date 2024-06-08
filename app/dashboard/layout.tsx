import Astro from "@/components/astro-illus";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen">
      {/* <Astro className="left-10 top-14 pointer-events-none select-none z-20" /> */}
      <div className="mx-5 md:mx-20 lg:mx-30 mt-2 md:mt-4 lg:mt-5">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
