import React from "react";
import "./voice-loader-question.css";
import { cn } from "@/lib/utils";
export const VoiceLoaderForQuestion = ({className}:{className?: string}) => {
  return (
    <div className={cn("", className)}>
      <div className="loader">
        <div className="cercle" />
        <div className="cercle" />
        <div className="cercle" />
        <div className="cercle" />
      </div>
    </div>
  );
};
