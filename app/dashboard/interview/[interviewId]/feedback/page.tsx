"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BreadcrumbItemWGLobal from "@/app/dashboard/_components/breadcrumb-global";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

const FeedBackPage = ({ params }: { params: { interviewId: string } }) => {
  const [interviewData, setInterviewData] = useState<any>(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any>();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

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
    <div className="flex flex-col">
      {/* <div className="pt-5 pb-4">
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
              label="Retake"
              link={`/dashboard/interview/${interviewData?.mockId}/start`}
            />
            <BreadcrumbSeparator />
            <BreadcrumbItemWGLobal
              label="Retake"
              link={`/dashboard/interview/${interviewData?.mockId}/feedback`}
              active={true}
            />
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}
    </div>
  );
};

export default FeedBackPage;
