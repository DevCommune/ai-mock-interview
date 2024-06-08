import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("jsonMockResponse").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdref: varchar("mockIdref").notNull(),
  question: varchar("question").notNull(),
  correctAnswer: text("correctAnswer").notNull(),
  userAnswer: text("userAnswer").notNull(),
  feedback: text("feedback").notNull(),
  rating: varchar("rating").notNull(),
  userEmail: varchar("userEmail").notNull(),
  createdAt: varchar("createdAt"),
});
