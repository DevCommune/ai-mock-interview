import React from "react";
import Header from "../_components/header";
import AddNewInterview from "./_components/add-new-interview";

const DashboardPage = () => {
  return (
    <div className="px-3">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-3xl capitalize">dashboard</h2>
        <h2 className="text-sm md:text-lg">
          Create and start your AI Mockup Interview
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
    </div>
  );
};

export default DashboardPage;
