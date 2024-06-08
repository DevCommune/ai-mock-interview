"use client";

import { RotateCw } from "lucide-react";
import React, { useContext } from "react";

export const RefreshButton = () => {
  return (
    <button className="group relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-400/60 dark:bg-gray-300/20">
      <div className="-rotate-45 transition duration-300 group-hover:rotate-0">
        <RotateCw className="h-4 w-4 text-black dark:text-white" />
      </div>
    </button>
  );
};
