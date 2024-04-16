'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2PTqKn8xqBo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { llm_inference } from '@/app/llm/services/api';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { set } from 'react-hook-form';

export default function Hero() {
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const prompt = `
  As a professor at a prestigious university renowned for its rigorous examination standards, you've been tasked with creating a set of challenging yet fair questions for the upcoming university exams. Your goal is to design questions that thoroughly test the students' understanding of the subject matter while also encouraging critical thinking and application of concepts. Utilize the provided text or data to generate a diverse range of questions spanning different topics and difficulty levels, ensuring that the exam adequately assesses the students' mastery of the course material. Your questions should be clear, concise, and structured in a way that facilitates effective evaluation of the students' knowledge and skills.
  
  Questions Details:
  ${JSON.stringify(text)}  
  
  Feedback:
1. **Format**: Ensure the answer follows a standard format with clear sections (e.g., Introduction, Body, Conclusion).
2. **Content**: Evaluate the content of the answer. Ensure it addresses the question thoroughly and provides relevant information.
3. **Grammar and Spelling**: Check for any grammatical errors or spelling mistakes and suggest corrections.
4. **Keywords**: Ensure the answer contains relevant keywords related to the topic to improve searchability.
5. **Overall Impression**: Provide an overall impression of the answer and any additional suggestions for improvement.
  
  
  Output Format (JSON):
  [
    {
      "question_number": "question number",
      "difficulty": "Medium",
      "topic": "Theory",
      "question_text": "Explain the concept of [specific concept] in [subject], providing examples to illustrate your understanding.",
      "answer": "The concept of [specific concept] in [subject] refers to [explanation]. For instance, [example 1] and [example 2] demonstrate how [specific concept] is applied in real-world scenarios."
    },
  ]
`;
  const fetchData = async () => {
    try {
      const questionResponse = await llm_inference(prompt);
      // Extract JSON data from the feedbackString
      const startIndex = questionResponse.indexOf('['); // Find the index of the first '{'
      const endIndex = questionResponse.lastIndexOf(']'); // Find the index of the last '}'
      const jsonData = questionResponse.substring(startIndex, endIndex + 1); // Extract the JSON data
      // Parse the JSON data into an object
      console.log(jsonData);
      const feedbacks = JSON.parse(jsonData);
      console.log(feedbacks);
      setQuestions(feedbacks);
    } catch (error) {
      console.error('Error fetching resume feedback:', error);
    }
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1">
        <div className="container flex flex-col items-center py-8 space-y-4 px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter">Examate</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Provide text to generate question paper
          </p>
          <div className="w-full max-w-3xl space-y-4">
            <textarea
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="w-full min-h-[200px] max-h-[400px] border-gray-200 border resize-y shadow-sm dark:border-gray-800"
              placeholder="Enter your text here..."
            />
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button onClick={fetchData}>Generate</Button>
              <Button variant="outline">Upload PDF</Button>
            </div>
            <div className="grid w-full gap-4">
              <h2 className="text-2xl font-semibold">Output</h2>
              <div className="border border-dashed border-gray-200 w-full p-4 rounded-lg dark:border-gray-800" />
              {questions.map((question) => (
                <div
                  key={question.question_number}
                  className="border border-dashed border-gray-200 w-full p-4 rounded-lg dark:border-gray-800"
                >
                  <h3 className="text-lg font-semibold">
                    Question: {question.question_number}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {question.question_text}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {question.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
