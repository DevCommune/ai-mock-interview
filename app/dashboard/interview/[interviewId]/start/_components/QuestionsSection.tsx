"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AudioLines, Lightbulb, Sparkles } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { VoiceLoader } from "./voice-loader";
import { VoiceLoaderForQuestion } from "./voice-loader-question";

interface QuestionsSectionProps {
  mockInterviewQuestion: any;
  activeQuestionIndex: number;
}

export const QuestionsSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
}: QuestionsSectionProps) => {
  const [userAnswer, setUserAnswer] = useState();
  const [speaking, setSpeaking] = useState(false);

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

  const textToSpeach = (text: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.onstart = () => setSpeaking(true);
      speech.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(speech);
    } else {
      toast("Sorry your browser does not support text to speech");
    }
  };

  const handleSpeachButton = (text: string) => {
    textToSpeach(text);
  };

  const SaveUserAnswer = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg flex flex-col gap-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question: string, index: number) => (
              <h2
                className={cn(
                  "p-2 bg-gray-600/15 rounded-full text-xs md:text-sm text-center cursor-pointer",
                  activeQuestionIndex === index && "bg-primary text-white"
                )}
              >
                <span>Question </span>#{index + 1}
              </h2>
            ))}
        </div>
        <div className="bg-gray-500/20 rounded-lg px-4 py-3 font-semibold text-sm md:text-[1rem] flex flex-col -gap-3">
          <h2>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
          <div
            className="w-full flex justify-end pr-3"
            onClick={() =>
              handleSpeachButton(
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

        <div className="mt-7">
          {results.length > 0 || isRecording ? (
            <ScrollArea className="h-40 w-full rounded-md  bg-blue-300/70 border border-blue-500 px-5 py-5">
              <ul className="flex flex-col items-start text-left">
                {results.map((result: any) => (
                  <li key={result.timestamp}>{result.transcript}</li>
                ))}
                {interimResult && <li>{interimResult}</li>}
              </ul>
              {results.length < 0 || isRecording && (
                <VoiceLoaderForQuestion className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20" />
              )}
            </ScrollArea>
          ) : (
            <Alert className="bg-blue-300/70 border border-blue-500 min-h-[25vh] overflow-y-auto">
              <AlertTitle className="text-black font-bold pb-2 flex items-center justify-start gap-2">
                <Sparkles className="h-5 w-5 fill-black -mt-[2px]" />
                NOTE !
              </AlertTitle>
              <AlertDescription className="text-sm">
                Click on Record Answer when you want to answer the question. At
                the end of interview we will give you the feedback along with
                correct answer for each of question and your answer to comapre
                it.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex justify-end items-center">
          <Button
            isLoading={isRecording}
            loadingText="recording"
            onClick={SaveUserAnswer}
          >
            {isRecording ? "Stop Recording" : "Record Answer"}
          </Button>
        </div>
      </div>
    )
  );
};
