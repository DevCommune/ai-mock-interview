"use client";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { ChevronsUpDown, Sparkles } from "lucide-react";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FeedBackPage = ({ params }: { params: { interviewId: string } }) => {
  const [feedbackList, setFeedbackList] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdref, params.interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
  };

  const handleRedirectDashboard = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/dashboard`);
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="flex flex-col p-4">
      <div>
        <h2 className="text-3xl text-emerald-700 font-bold">Congratulation</h2>
        <p className="text-xl font-semibold">Here is your interview feedback</p>
        <p
          className={cn(
            "text-primary text-lg my-1 flex items-center justify-start gap-1"
          )}
        >
          <span>
            <Sparkles className="size-5 fill-yellow-500 text-yellow-600" />
          </span>
          Your overall interview rating: <span>7/10</span>
        </p>

        <p className="text-sm text-muted-foreground">
          Find below interview question with correct answer, your answer and
          feedback for improvement
        </p>
      </div>
      <ScrollArea className="mt-2 h-[58vh] w-full py-2 px-3">
        {feedbackList &&
          feedbackList.map((item: any, index: number) => {
            return (
              <Collapsible key={index} className="py-[2px]">
                <CollapsibleTrigger className="p-2 bg-gray-500/20 rounded-lg my-2 text-left flex items-center justify-between w-full">
                  <p className="font-bold text-rose-600">
                    Question :{" "}
                    <span className="text-md text-black font-semibold">
                      {item?.question}
                    </span>
                  </p>
                  <span className="flex items-center justify-center bg-gray-600/20 p-2 rounded-md">
                    <ChevronsUpDown className="size-5" />
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent className="pb-2">
                  <div className="flex flex-col gap-2">
                    <h2
                      className={cn(
                        "text-sm px-2 underline",
                        item.rating <= 5 ? "text-red-600" : "text-green-700"
                      )}
                    >
                      <span className="font-bold">Rating: </span>
                      {item?.rating}
                    </h2>
                    <h2
                      className={cn(
                        "py-2 px-2 border rounded-lg bg-yellow-400/40 text-sm border-yellow-700",
                        item.rating <= 4 && "bg-red-400/40 border-red-600/50",
                        item.rating >= 7 && "bg-green-400/40 border-green-700"
                      )}
                    >
                      <span className="font-bold">Your answer: </span>
                      {item?.userAnswer}
                    </h2>
                    <h2 className="py-2 px-2 border rounded-lg bg-green-300/40 text-sm border-green-700">
                      <span className="font-bold">Corrent Answer: </span>
                      {item?.correctAnswer}
                    </h2>
                    <h2 className="py-2 px-2 border rounded-lg bg-blue-400/40 text-sm border-blue-700">
                      <span className="font-bold">Feddback: </span>
                      {item?.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
      </ScrollArea>

      <div className="w-full flex justify-end mt-2">
        <Button
          onClick={handleRedirectDashboard}
          isLoading={loading}
          loadingText="Redirecting"
          type="button"
          variant="shine"
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default FeedBackPage;
