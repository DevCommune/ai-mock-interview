interface InputPromptsProps {
  jobPosition: string;
  jobDescription: string;
  jobExperience: string;
}

const QUESTION_COUNT = process.env.NEXT_PUBLIC_MAX_QUESTION_COUNT;
export const InputPromptsFormat = ({
  jobDescription,
  jobExperience,
  jobPosition,
}: InputPromptsProps) => {
  return `Given the job position of a ${jobPosition} with primary skills in ${jobDescription}, and ${jobExperience} years of experience, please provide ${QUESTION_COUNT} common interview questions that companies typically ask to assess a candidate's proficiency and experience with these technologies. Format the output in JSON with separate fields for each question and its corresponding answer.`;
};
