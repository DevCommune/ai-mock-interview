"use client";
import { CircleFadingPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import uuid from "uuid-random";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { chatSession } from "@/utils/gemini-ai";
import { InputPromptsFormat } from "@/utils/input-prompts-format";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  jobPosition: z.string().min(1, {
    message: "Provide your job position/role",
  }),
  jobDescription: z.string().min(1, {
    message: "Provide your job description",
  }),
  jobExperience: z
    .string()
    .min(1, {
      message: "Provide your job experience",
    })
    .max(50, {
      message: "Provide your job experience less than 50 years",
    }),
});

const AddNewInterview = () => {
  const { user } = useUser();

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobPosition: "",
      jobDescription: "",
      jobExperience: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const InputPrompt = InputPromptsFormat(values);

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const parsedResponse = JSON.parse(MockJsonResponse);
      setJsonResponse(parsedResponse);

      if (MockJsonResponse) {
        try {
          const response = await db
            .insert(MockInterview)
            .values({
              mockId: uuid(),
              jsonMockResponse: MockJsonResponse,
              jobPosition: values.jobPosition,
              jobDescription: values.jobDescription,
              jobExperience: values.jobExperience,
              createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
              createdAt: moment().format("DD-MM-YYYY"),
            })
            .returning({ mockId: MockInterview.mockId });

          if (response) {
            setOpenDialog(false);
            router.push(`/dashboard/interview/${response[0]?.mockId}`);
            toast("Interview created ✨");
            setOpenDialog(false);
          } else {
            setOpenDialog(false);
            toast("Failed to create Interview, try again");
          }
        } catch (dbError: any) {
          console.error("Error while storing in the database", dbError);
          toast("Failed to store in the database");
        }
      } else {
        toast("Failed to generate from Json Data");
      }

      setLoading(false);
    } catch (aiError: any) {
      console.error("Error while generating from AI", aiError);
      toast("Failed to generate from AI");
      setLoading(false);
    }
  }

  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-10 border-[1.5px] rounded-lg bg-gray-700/5 hover:shadow-sm transition-all cursor-pointer hover:scale-105 backdrop-blur-sm"
      >
        <h2 className="font-semibold text-lg text-center flex items-center justify-center gap-1.5">
          Add New
          <CircleFadingPlus className="w-5 h-5 shrink-0" />
        </h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <div>
                <p className="text-slate-900">
                  Add details about your job position/role, job description, and
                  years of experience.
                </p>
                <div className="py-3">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <FormField
                        control={form.control}
                        name="jobPosition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Job Role/Job Position
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Full Stack Developer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="jobDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Job Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="React, Angular, Node.js, MySQL ..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="jobExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Years of Experience
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="5" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter className="flex gap-2 items-center justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setOpenDialog(false)}
                          type="button"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          isLoading={loading}
                          disabled={loading}
                          loadingText="Generating from AI"
                        >
                          Start Interview
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
