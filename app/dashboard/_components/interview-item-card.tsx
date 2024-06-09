"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const InterviewItemCard = ({ interview }: { interview: any }) => {
  const [loading, setLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  const router = useRouter();

  const handleRedirectRetakePage = () => {
    setStartLoading(true);
    setTimeout(() => {
      router.push(`/dashboard/interview/${interview.mockId}`);
      setStartLoading(false);
    }, 1400);
  };

  const handleRedirectFeedbackPage = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/dashboard/interview/${interview.mockId}/feedback`);
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="border border-gray-400 shadow-sm rounded-lg p-3 flex flex-col gap-2">
      <div>
        <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
        <h2 className="text-sm text-gray-600">
          {interview?.jobExperience} Years of Experience
        </h2>
        <p className="text-xs text-gray-500">
          Created At : <span>{interview?.createdAt}</span>
        </p>
      </div>
      <div className="w-full flex items-center justify-end gap-4">
        <Button
          size="sm"
          onClick={handleRedirectFeedbackPage}
          isLoading={loading}
          loadingText="Loading"
        >
          Feedback
        </Button>
        <Button
          size="sm"
          isLoading={startLoading}
          loadingText="Starting"
          onClick={handleRedirectRetakePage}
        >
          Retake
        </Button>
      </div>
    </div>
  );
};
