import React from "react";
import Header from "../_components/header";
import AddNewInterview from "./_components/add-new-interview";
import { PreviousInterviewList } from "./_components/previous-interview-list";

const DashboardPage = () => {
  return (
    <div className="px-3 flex flex-col mt-7 gap-3">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-3xl capitalize">dashboard</h2>
        <h2 className="text-sm md:text-lg">
          Create and start your AI Mockup Interview
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 my-2">
        <AddNewInterview />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl capitalize">
          Previous Interview List
        </h2>

        <div>
          <PreviousInterviewList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
