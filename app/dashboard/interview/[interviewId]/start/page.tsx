"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { QuestionsSection } from "./_components/QuestionsSection";
import { WebCam } from "./_components/WebCam";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BreadcrumbItemWGLobal from "@/app/dashboard/_components/breadcrumb-global";

const InterviewQuestion = ({ params }: { params: { interviewId: string } }) => {
  const [interviewData, setInterviewData] = useState<any>(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const router = useRouter();
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

  const handleRedirectStasrtPage = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/dashboard/interview/${interviewData?.mockId}/feedback`);
      toast("Checkout Feedback 🥳");
    }, 1700);
  };

  return (
    mockInterviewQuestion && (
      <div className="flex flex-col gap-3 justify-end w-full pt-4 pb-1">
        <div className="">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItemWGLobal label="Dashboard" link="/dashboard" />
              <BreadcrumbSeparator />
              <BreadcrumbItemWGLobal
                label="Information"
                link={`/dashboard/interview/${interviewData?.mockId}`}
              />
              <BreadcrumbSeparator />

              <BreadcrumbItemWGLobal
                label="Interview"
                link={`/dashboard/interview/${interviewData?.mockId}/start`}
                active={true}
              />
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Question */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            setActiveQuestionIndex={setActiveQuestionIndex}
          />

          {/* Video audio recording */}
          <div className="flex flex-col gap-8">
            <div className="h-[70vh]">
              <WebCam mockInterviewQuestion={mockInterviewQuestion} />
            </div>
            <div className="flex justify-end w-full items-center gap-5">
              {activeQuestionIndex > 0 && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setActiveQuestionIndex(activeQuestionIndex - 1)
                  }
                >
                  Previous Question
                </Button>
              )}

              {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
                <Button
                  onClick={() =>
                    setActiveQuestionIndex(activeQuestionIndex + 1)
                  }
                >
                  Next Question
                </Button>
              )}
              {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
                <Button
                  onClick={handleRedirectStasrtPage}
                  isLoading={loading}
                  loadingText="Redirecting"
                >
                  End Interview
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default InterviewQuestion;
