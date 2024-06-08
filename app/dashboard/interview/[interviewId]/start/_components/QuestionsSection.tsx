"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AudioLines, Sparkles } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { VoiceLoader } from "./voice-loader";
import { VoiceLoaderForQuestion } from "./voice-loader-question";
import { feedbackPromptFormat } from "@/utils/feedback-prompt";
import { chatSession } from "@/utils/gemini-ai";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { RefreshButton } from "./refresh-answer-button";

interface QuestionsSectionProps {
  mockInterviewQuestion: any;
  activeQuestionIndex: number;
  interviewData: any;
  setActiveQuestionIndex?: any;
}

export const QuestionsSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  setActiveQuestionIndex,
}: QuestionsSectionProps) => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [speaking, setSpeaking] = useState(false);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [finalanswer, setFinalAnswer] = useState<string>("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result: any) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  const textToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.onstart = () => setSpeaking(true);
      speech.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(speech);
    } else {
      toast("Sorry your browser does not support text to speech");
    }
  };

  const handleSpeechButton = (text: string) => {
    textToSpeech(text);
  };

  useEffect(() => {
    setFinalAnswer(userAnswer);
  }, [isRecording, userAnswer]);

  const RecordAnswer = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const clearUserData = () => {
    setUserAnswer("");
    setFinalAnswer("");
    results.length = 0;
  };

  const storeAnswerToDb = async () => {
    setLoading(true);

    if (finalanswer.length < 10) {
      toast("Provide at least 10 characters to submit the answer");
      setLoading(false);
      return;
    }

    const feedbackPrompt = feedbackPromptFormat({
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      userAnswer: finalanswer,
    });

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const jsonFeedbackResponse = JSON.parse(mockJsonResponse);

      if (interviewData?.mockId && user?.primaryEmailAddress?.emailAddress) {
        const resp = await db.insert(UserAnswer).values({
          mockIdref: interviewData.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAnswer: userAnswer,
          feedback: jsonFeedbackResponse?.feedback,
          rating: jsonFeedbackResponse?.rating,
          userEmail: user.primaryEmailAddress.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        });

        if (resp) {
          toast("Answer recorded successfully");
          clearUserData();
        } else {
          toast("Something went wrong while saving");
        }
      } else {
        toast("Error while fetching user data");
      }
    } catch (error) {
      toast("Something went wrong while saving");
    }
    setLoading(false);
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg flex flex-col gap-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 relative">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question: string, index: number) => (
              <h2
                key={index}
                className={cn(
                  "p-2 bg-gray-600/15 rounded-full text-xs md:text-sm text-center cursor-pointer",
                  activeQuestionIndex === index && "bg-primary text-white"
                )}
                onClick={() => setActiveQuestionIndex(index)}
              >
                <span>Question </span>#{index + 1}
              </h2>
            ))}
          <div
            className="absolute top-12 right-5 flex justify-end !z-10"
            onClick={() =>
              handleSpeechButton(
                mockInterviewQuestion[activeQuestionIndex]?.question
              )
            }
          >
            {speaking ? (
              <VoiceLoader />
            ) : (
              <AudioLines className="size-9 rounded-lg cursor-pointer" />
            )}
          </div>
        </div>
        <ScrollArea className="bg-gray-500/20 rounded-lg px-4 py-3 font-semibold text-sm md:text-[1rem] flex flex-col gap-3 h-[22vh] overflow-y-auto">
          <h2>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        </ScrollArea>

        <div className="">
          {results.length > 0 || isRecording ? (
            <ScrollArea className="h-40 w-full rounded-md  bg-blue-300/70 border border-blue-500 px-5 py-5">
              <ul className="flex flex-col items-start text-left">
                {results.map((result: any) => (
                  <li key={result.timestamp}>{result.transcript}</li>
                ))}
                {interimResult && <li>{interimResult}</li>}
              </ul>
              {results.length < 0 ||
                (isRecording && (
                  <VoiceLoaderForQuestion className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20" />
                ))}
              <div
                className="absolute top-3 right-5"
                onClick={() => clearUserData()}
              >
                <RefreshButton />
              </div>
            </ScrollArea>
          ) : (
            <Alert className="bg-blue-300/70 border border-blue-500 min-h-[25vh] overflow-y-auto">
              <AlertTitle className="text-black font-bold pb-2 flex items-center justify-start gap-2">
                <Sparkles className="h-5 w-5 fill-black -mt-[2px]" />
                NOTE!
              </AlertTitle>
              <AlertDescription className="text-sm">
                Click on Record Answer when you want to answer the question. At
                the end of the interview, we will give you feedback along with
                the correct answer for each question and your answer to compare
                it.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex justify-end items-center gap-4 pr-2">
          <Button
            isLoading={isRecording}
            loadingText="recording"
            onClick={() => {
              RecordAnswer();
            }}
            disabled={loading}
          >
            {isRecording ? "Stop Recording" : "Record Answer"}
          </Button>
          <Button
            isLoading={loading}
            loadingText="submitting"
            onClick={() => {
              storeAnswerToDb();
            }}
            disabled={loading}
          >
            Submit Answer
          </Button>
        </div>
      </div>
    )
  );
};
