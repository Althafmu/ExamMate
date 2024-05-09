/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { llm_inference } from '@/app/llm/services/api';
import { Label } from '@/components/ui/label';
import { supabase } from '@/utils/supabase';
import { ExamType, QuestionTypeGenerated, UserType } from '@/utils/type';
import { User, UserResponse } from '@supabase/supabase-js';
import { title } from 'process';
import { use, useCallback, useEffect, useMemo, useState } from 'react';
import pdfToText from 'react-pdftotext';
import { toast } from 'sonner';

export default function teacher_first() {
  const [text, setText] = useState<string>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [previewQuestions, setPreviewQuestions] = useState<any[]>([]);
  const [exam, setExam] = useState<'create' | 'add'>('create')
  const [examTitle, setExamTitle] = useState<string>();
  const [examCode, setExamCode] = useState<string>();
  const [user, setUser] = useState<UserType>()
  const [teacherExams, setTeacherExams] = useState<ExamType[]>()

  useEffect(() => {
    if (!user) getUserData().then(setUser)
  }, [])
  const userRole = useMemo(() => user?.role, [user])
  const userId = useMemo(() => user?.id, [user])
  const prompt = useMemo(() => getPrompt(text), [text])
  useEffect(() => {
    if (userId && !teacherExams) {
      getTeacherExams(userId).then(data => {
        setTeacherExams(data)
      })
    }
  }, [userId, exam])
  useEffect(() => {
    if (teacherExams && teacherExams.length >= 1 && exam === 'add') setExamCode(teacherExams[0].code)
    else if (exam === 'create') setExamCode(undefined)
  }, [exam])

  const fetchData = async () => {
    let toastId

    try {
      if (!text) {
        toast.error('Please upload a file first')
        return
      }
      toastId = toast.loading('Generating questions');
      const questionResponse = await llm_inference(prompt);
      toast.dismiss(toastId);
      toast.success('Questions generated successfully')
      // Extract JSON data from the feedbackString
      const startIndex = questionResponse.indexOf('['); // Find the index of the first '{'
      const endIndex = questionResponse.lastIndexOf(']'); // Find the index of the last '}'
      const jsonData = questionResponse.substring(startIndex, endIndex + 1); // Extract the JSON data
      // Parse the JSON data into an object
      const feedbacks = JSON.parse(jsonData);
      setQuestions(feedbacks);
    } catch (error) {
      toast.dismiss(toastId);
      console.error('Error fetching resume feedback:', error);
    }
  };
  async function onSubmit(event: any) {
    event.preventDefault();
    if (previewQuestions.length <= 0) {
      toast.error('Please add questions first')
      return
    }
    // const questionSet = questions.map((question: any, index) => ({ ...question, marks: event.target[`marks${index + 1}`].value }))
    // const questionsFiltered: QuestionTypeGenerated[] = questionSet.filter((_: any, index: number) => event.target[`selectQuestion${index + 1}`].checked)
    const questionsFiltered = previewQuestions.reduce((acc: QuestionTypeGenerated[], question: any, index) => {
      const marks = event.target[`marks${index + 1}`].value
      if (event.target[`selectQuestion${index + 1}`].checked) {
        acc.push({ ...question, marks })
      }
      return acc
    }, [])

    if (questionsFiltered.length <= 0) {
      toast.error('Please select atleast one question')
      return
    }
    if (!user) {
      toast.error('Please login first')
      return
    }
    if (userRole !== 'teacher') {
      toast.error('Only teachers can generate questions')
      return
    }
    let examData
    const examGenerateQuery = supabase.from('exams').insert({ teacher_id: userId, code: examCode, title: examTitle, status: 'ready' }).select('id')
    if (exam === 'create') {
      if (!examTitle) {
        toast.error('Please enter exam title')
        return
      }
      if (!examCode) {
        toast.error('Please enter exam code')
        return
      }
      const res = await examGenerateQuery.single()
      examData = res.data
      const { error: examError } = res
      if (examError) {
        toast.error(examError.message)
        return
      }
      if (examData) {
        toast.success('Exam generated successfully')
      }
    }
    if (exam === 'add' && examCode) {
      const res = await supabase.from('exams').select('id').eq('code', examCode).single()
      examData = res.data
      if (res.error) {
        toast.error('Selected Exam not found')
        return
      }
    }

    const examId = examData?.id
    const payload = questionsFiltered.map(question => ({ question: question.question_text, answer: question.answer, teacher_id: userId, exam_id: examId, marks: question.marks }))
    const { status, error: questionError } = await supabase.from('questions').insert(payload)
    if (questionError) {
      toast.error(questionError?.message)
      if (exam === 'create') examGenerateQuery.rollback()
      return
    }
    if (status === 201) {
      if (userId) {
        getTeacherExams(userId).then(setTeacherExams)
      }
      toast.success('Questions added successfully')
    }
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
  const getTeacherExams = useCallback(async (userId: string): Promise<ExamType[] | undefined> => {
    const { data, error } = await supabase.from('exams').select('*').eq('teacher_id', userId)
    if (error) {
      console.error(error)
      return
    }
    return data
  }, [])
  const getUserData = useCallback(async (): Promise<UserType | undefined> => {
    const { data: { user }, error: detailError } = await supabase.auth.getUser() || {} as UserResponse
    if (detailError) {
      console.error(detailError)
      return
    }
    const { id: userId } = user ?? {} as User
    const { data: userData, error } = await supabase.from('users').select('*').eq('id', userId).single()
    if (error) {
      console.error(error)
      return
    }
    return userData
  }, [])
  function addToPreview(event: any) {
    event.preventDefault()

    if (questions.length <= 0) {
      toast.error('Please generate questions first')
      return
    }
    const questionsFiltered = questions.reduce((acc: QuestionTypeGenerated[], question: any, index) => {
      const marks = event.target[`marks${index + 1}`].value
      if (event.target[`selectQuestion${index + 1}`].checked) {
        acc.push({ ...question, marks })
      }
      return acc
    }, [])
    if (questionsFiltered.length <= 0) {
      toast.error('Please select atleast one question')
      return
    }
    setPreviewQuestions(questions => [...questions,...questionsFiltered])
    toast.success('Questions added to preview')
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
        <div className="flex flex-col mt-2 space-y-2 w-full max-w-md">
          
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={fetchData}
          >
            Generate
          </button>
        <h2 className="text-lg font-semibold mt-4">Choose Questions</h2>

          <div key="1" className="flex flex-cols items-center justify-center">
            <div className="container flex flex-col items-center px-4 sp md:px-6">
              <form className="flex flex-col mt-1 space-y-2 w-full max-w-md" onSubmit={addToPreview}>
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
                    <input id={`marks${index + 1}`} type="number" className='w-10 border rounded-lg' defaultValue={4} />
                  </div>
                ))}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit" >
                  Add Question
                </button>
              </form>
            </div>
          </div>
          <div>
            <div className='flex justify-center  gap-1'>
              <button className='bg-green-500 hover:bg-green-700 text-white font-thin text-xs py-2 px-4 rounded' onClick={() => setExam('create')}>Create New Exam</button>
              {(teacherExams ?? []).length > 0 &&
                <button className='bg-green-500 hover:bg-green-700 text-white font-thin text-xs py-2 px-4 rounded' onClick={() => setExam('add')}>
                  Add to Existing Exam
                </button>}
            </div>
            <div className='flex justify-center gap-3 my-2' style={{ flexDirection: exam === 'create' ? 'column' : 'row' }}>
              <h3 className='text-center my-2 font-bold '>{exam === 'create' ? 'Create New Exam' : 'Add to Existing Exam'}</h3>
              {exam === 'create' && <div className="flex gap-2 justify-center">
                <input className=' border py-1 px-4 rounded-lg' type='text' id='title' value={examTitle ?? ''} onChange={e => setExamTitle(e.target.value)} placeholder='Exam title' />
                <input className=' border py-1 px-4 rounded-lg' type='text' id='code' value={examCode ?? ''} onChange={e => setExamCode(e.target.value)} placeholder='Exam code' />
              </div>}
              {exam === 'add' && <select className=' border py-1 px-2 rounded-lg' onChange={e => setExamCode(e.target.value)}>
                {teacherExams?.map((exam, index) => (
                  <option key={index} value={exam.code}>{exam.title}</option>
                ))}
              </select>
              }
            </div>
          </div>
          <div key="1" className="flex flex-cols items-center justify-center">
            <div className="container flex flex-col items-center px-4 sp md:px-6">
              <form className="flex flex-col mt-1 space-y-2 w-full max-w-md" onSubmit={onSubmit}>
                {previewQuestions.map((question, index) => (
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
                    <input id={`marks${index + 1}`} type="number" className='w-10 border rounded-lg' defaultValue={4} />
                  </div>
                ))}
                <button disabled={previewQuestions.length === 0} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:bg-gray-300" type="submit" >
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



function getPrompt(text: string | undefined) {
  return `
  As a professor at a prestigious university renowned for its rigorous examination standards, you've been tasked with creating a set of challenging yet fair questions for the upcoming university exams. Your goal is to design questions that thoroughly test the students' understanding of the subject matter while also encouraging critical thinking and application of concepts. Utilize the provided text or data to generate a diverse range of questions spanning different topics and difficulty levels, ensuring that the exam adequately assesses the students' mastery of the course material. Your questions should be clear, concise, and structured in a way that facilitates effective evaluation of the students' knowledge and skills.
  
  Questions Details:
  ${JSON.stringify(text ?? '')}  
  
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
    },
  ]
`;
}