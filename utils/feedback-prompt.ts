interface feedbackPromptProps {
  question: string;
  userAnswer: string;
}

export const feedbackPromptFormat = ({
  question,
  userAnswer,
}: feedbackPromptProps) => {
  return (
    `Question : ${question} , User Answer: ${userAnswer}, Depends on Question and user answer for given interview question` +
    "please give us rating for answer and feedback as area of improvement if any" +
    "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field."
  );
};
