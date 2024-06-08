"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { QuestionsSection } from "./_components/QuestionsSection";
import { RecordAnsSection } from "./_components/RecordAnsSection";

const InterviewQuestion = ({ params }: { params: { interviewId: string } }) => {
  const [interviewData, setInterviewData] = useState<any>(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  /**
   * used to get mock interview details based on interview id
   */
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResponse);
    // console.log(jsonMockResp);

    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Question */}
      <QuestionsSection mockInterviewQuestion={mockInterviewQuestion}
      activeQuestionIndex={activeQuestionIndex}
       />

      {/* Video audio recording */}
      <RecordAnsSection 
      mockInterviewQuestion={mockInterviewQuestion}
        />
    </div>
  );
};

export default InterviewQuestion;
