"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { InterviewItemCard } from "./interview-item-card";

export const PreviousInterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState<any>(null);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(
          MockInterview.createdBy,
          user?.primaryEmailAddress?.emailAddress ?? ""
        )
      )
      .orderBy(MockInterview.id);
    setInterviewList(result);
  };
  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {interviewList &&
          interviewList.map((interview: any, index: number) => (
            <InterviewItemCard 
            interview={interview}
            key={index} />
          ))}
      </div>
    </div>
  );
};
