"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const InterViewPage = ({ params }: { params: { interviewId: string } }) => {
  const [interviewData, setInterviewData] = useState<any>(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
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
    setInterviewData(result[0]);
  };

  const handleWebCamAccess = () => {
    setWebcamEnabled((prev) => !prev);
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="font-bold text-4xl">Let's get started</h2>
      <div className="flex w-full items-center justify-between px-10 mt-6">
        <div className="bg-gray-500/20 min-h-[60vh] h-full w-[45vw] rounded-lg pt-10 pb-5 flex flex-col gap-4">
          <div className="flex flex-col gap-3 px-10">
            <h2 className="flex gap-1 capitalize truncate">
              <span className="font-bold">Job Role/ Jon Position: </span>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="flex gap-1 capitalize truncate">
              <span className="font-bold">Job Description: </span>
              {interviewData?.jobDescription}
            </h2>
            <h2 className="flex gap-1 capitalize truncate">
              <span className="font-bold">Year of Experience: </span>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="px-5">
            <Alert className="bg-yellow-300/70 border border-yellow-500">
              <Lightbulb className="h-6 w-6 -mt-1" />
              <AlertTitle className="text-black font-bold pb-2">
                Information !
              </AlertTitle>
              <AlertDescription className="text-sm">
                Enable Video Web Cam and Microphone to Start your AI Generated
                Mock Interview, It Has few question which you can answer and at
                the last you will get the report on the basis of your answer.
                NOTE: We never record your video , Web cam access you can
                disable at any time if you want
              </AlertDescription>
            </Alert>
          </div>
          <div className="flex items-center justify-end w-full px-5">
            <Button variant="gooeyLeft">Start Interview</Button>
          </div>
        </div>
        <div className="my-10 flex flex-col gap-6">
          <div className="h-72 w-full rounded-lg border bg-gray-500/20 overflow-hidden flex items-center justify-center">
            {webcamEnabled ? (
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored={true}
                style={{
                  height: 300,
                  width: 400,
                }}
              />
            ) : (
              <WebcamIcon
                onClick={() => handleWebCamAccess()}
                className="h-16 w-16 shrink-0 cursor-pointer"
              />
            )}
          </div>
          <Button onClick={() => handleWebCamAccess()}>
            {webcamEnabled
              ? "Stop Web Camera and Microphone"
              : "Enable Web Camera and Microphone"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterViewPage;
