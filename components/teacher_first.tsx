/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { llm_inference } from '@/app/llm/services/api';
import { Label } from '@/components/ui/label';
import { supabase } from '@/utils/supabase';
import { User, UserResponse } from '@supabase/supabase-js';
import { useState } from 'react';
import pdfToText from 'react-pdftotext';
import { toast } from 'sonner';

export default function teacher_first() {
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
      // const questionResponse = await llm_inference(prompt);
      const questionResponse = localStorage.getItem('json') || ''
      // Extract JSON data from the feedbackString
      const startIndex = questionResponse.indexOf('['); // Find the index of the first '{'
      const endIndex = questionResponse.lastIndexOf(']'); // Find the index of the last '}'
      const jsonData = questionResponse.substring(startIndex, endIndex + 1); // Extract the JSON data
      // Parse the JSON data into an object
      // localStorage.setItem('json', jsonData)
      const feedbacks = JSON.parse(jsonData);
      setQuestions(feedbacks);
    } catch (error) {
      console.error('Error fetching resume feedback:', error);
    }
  };
  async function onSubmit(event: any) {
    let role
    event.preventDefault();
    if (questions.length <= 0) {
      toast.error('Please generate questions first')
      return
    }
    const questionsFiltered: QuestionType[] = questions.filter((_: any, index: number) => event.target[`selectQuestion${index + 1}`].checked)
    if (questionsFiltered.length <= 0) {
      toast.error('Please select atleast one question')
      return
    }
    const { data: { user }, error: detailError } = await supabase.auth.getUser() || {} as UserResponse
    if (detailError) {
      toast.error(detailError?.message)
      return
    }
    const { id: userId } = user ?? {} as User
    const { data: userData, error } = await supabase.from('users').select('*').eq('id', userId).single()
    if (error) toast.error(error?.message)
    if (userData) role = userData?.role
    if (role !== 'teacher') {
      toast.error('Only teachers can generate questions')
      return
    }
    const examId = undefined
    const payload = questionsFiltered.map(question => ({ question: question.question_text, answer: question.answer, teacher_id: userId, exam_id: examId }))
    const { status } = await supabase.from('questions').insert(payload)
    console.log(status)
  }
  function extractText(event: any) {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text: string) => {
        console.log(text);
        setText(text);
      })
      .catch((error: any) => console.error('Failed to extract text from pdf'));
  }
  return (
    <div
      key="1"
      className="flex flex-cols items-center justify-center min-h-screen py-6"
    >
      <div className="container flex flex-col items-center  justify-center px-4 space-y-2 md:px-6">
        <div className="text-4xl font-bold tracking-tighter">Examate</div>
        <div className=" justify-center max-w-sm items-center flex gap-1">
          <Label htmlFor="pdf">Upload PDF</Label>
          <input type="file" accept="application/pdf" onChange={extractText} />
        </div>
        <h2 className="text-lg font-semibold mt-4">Choose Questions</h2>
        <div className="flex flex-col mt-2 space-y-2 w-full max-w-md">
          <div className="flex items-center space-x-4 w-full">
            <input
              id="threeMark"
              name="questionType"
              type="radio"
              value="3 mark"
            />
            <Label htmlFor="threeMark">3 mark questions</Label>
            <select className="select w-full" id="threeMarkCount" name="count">
              <option value="">Count</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <input id="fourMark" type="radio" value="fourmark" />
            <Label htmlFor="fourMark">4 mark questions</Label>
            <select className="select w-full" id="fourMarkCount" name="count">
              <option value="">Count</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <input id="sevenMark" type="radio" value="sevenmark" />
            <Label htmlFor="sevenMark">7 mark questions</Label>
            <select className="select w-full" id="sevenMarkCount" name="count">
              <option value="">Count</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <input id="tenMark" type="radio" value="tenmark" />
            <Label htmlFor="tenMark">10 mark questions</Label>
            <select className="select w-full" id="tenMarkCount" name="count">
              <option value="">Count</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <input id="fourteenMark" type="radio" value="fourteenmark" />
            <Label htmlFor="fourteenMark">14 mark questions</Label>
            <select
              className="select w-full"
              id="fourteenMarkCount"
              name="count"
            >
              <option value="">Count</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={fetchData}
          >
            Generate
          </button>
          <div key="1" className="flex flex-cols items-center justify-center">
            <div className="container flex flex-col items-center px-4 sp md:px-6">
              <form className="flex flex-col mt-1 space-y-2 w-full max-w-md" onSubmit={onSubmit}>
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 w-full"
                  >
                    <Label htmlFor={`question${index + 1}`}>{`Question ${index + 1
                      }`}</Label>
                    <textarea
                      id={`question${index + 1}`}
                      className="w-full h-20 p-2 border rounded"
                      placeholder={`Question ${index + 1} will appear here`}
                      defaultValue={question.question_text} // Populate the textarea with question text
                    ></textarea>
                    <input id={`selectQuestion${index + 1}`} type="checkbox" />
                    <Label htmlFor={`selectQuestion${index + 1}`}>Select</Label>
                  </div>
                ))}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit" >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type QuestionType = {
  answer: string
  difficulty: string
  question_number: string | number
  question_text: string
  topic: string
}