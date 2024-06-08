"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import Webcam from "react-webcam";

interface RecordAnsSectionProps {
  mockInterviewQuestion: any;
}

export const RecordAnsSection = ({
  mockInterviewQuestion,
}: RecordAnsSectionProps) => {
  const [webcamEnabled, setWebcamEnabled] = useState(true);

  const handleWebCamAccess = () => {
    setWebcamEnabled((prev) => !prev);
  };

  return (
    mockInterviewQuestion && (
      <div className="flex flex-col justify-center items-center bg-gray-500/70 rounded-lg pt-2 px-5 gap-4">
        <div>
          {webcamEnabled ? (
            <div className="rounded-lg overflow-hidden">
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored={true}
                style={{
                  height: "100%",
                  width: "100%",
                  zIndex: 10,
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-6 items-center justify-center">
              <Image src="/webcam.png" alt="webcam" width={200} height={200} />
              <Button onClick={() => handleWebCamAccess()}>
                {webcamEnabled ? "Stop Web Camera" : "Enable Web Camera"}
              </Button>
            </div>
          )}
        </div>
        <div>
          {webcamEnabled && (
            <Button onClick={() => handleWebCamAccess()}>
              Stop Web Camera
            </Button>
          )}
        </div>
      </div>
    )
  );
};
