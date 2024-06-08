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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  jobPosition: z.string().min(2, {
    message: "provide your job position/role",
  }),
  jobDescription: z.string().min(2, {
    message: "provide your job description",
  }),
  jobExperience: z.string().min(2, {
    message: "provide your job experience",
  }),
});

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobPosition: "",
      jobDescription: "",
      jobExperience: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <div>
                <p className="text-slate-900">
                  add details about your job position/role, job description and
                  year of experience
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
                                placeholder="React, Angular, nodejs, mysql .."
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
                              Year of experience
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="3" type="number" {...field} />
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
                        <Button type="submit">Start interview</Button>
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
