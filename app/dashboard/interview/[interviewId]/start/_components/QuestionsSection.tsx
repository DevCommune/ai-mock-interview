import { cn } from "@/lib/utils";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Sparkles } from "lucide-react";
interface QuestionsSectionProps {
  mockInterviewQuestion: any;
  activeQuestionIndex: number;
}

export const QuestionsSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
}: QuestionsSectionProps) => {
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg flex flex-col gap-6 mt-10">
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
        <div className="bg-gray-500/20 rounded-lg px-4 py-3 font-semibold text-sm md:text-[1rem]">
          <h2>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        </div>

        <div className="mt-10">
          <Alert className="bg-blue-300/70 border border-blue-500">
            <Sparkles className="h-5 w-5 fill-black -mt-[2px]" />
            <AlertTitle className="text-black font-bold pb-2">
              NOTE !
            </AlertTitle>
            <AlertDescription className="text-sm">
              Click on Record Answer when you want to answer the question. At
              the end of interview we will give you the feedback along with
              correct answer for each of question and your answer to comapre it.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  );
};
