import Question1 from "@/markdown/question1.mdx";
import Question2 from "@/markdown/question2.mdx";
import Question3 from "@/markdown/question3.mdx";
import { ComponentType } from "react";

export type QuestionAndAnswer = {
    question: string;
    answer: ComponentType;
};

export const questionsAndAnswers = [
    {
        question: "What are the key features of Next.js?",
        answer: Question1,
    },
    {
        question: "What are the Differences Between Next.js and React.js?",
        answer: Question2,
    }, {
        question: "How does Next.js handle image optimization?",
        answer: Question3,
    }
];