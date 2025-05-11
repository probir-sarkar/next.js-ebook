import { questionsAndAnswers } from "@/data/questions-and-answers";
import { Card, CardContent } from "./ui/card";
import Question1 from "@/markdown/question1.mdx";

const PreviewQuestions = () => {
    return (<section className="container mx-auto py-16 px-4 md:py-24 border-t border-gray-800">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Preview Questions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
                Here's a sneak peek at some of the questions and answers you'll find in the e-book
            </p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
            {questionsAndAnswers.map(({ question, answer: Answer }, i) => (
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="pt-6">
                        <h3 className="text-xl font-bold mb-3 text-emerald-400">
                            {question}
                        </h3>
                        <div className="bg-black rounded-lg p-4 border border-gray-800 text-gray-300">
                            <Answer />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </section>);
}

export default PreviewQuestions;