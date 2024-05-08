'use client';
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase";
import { AnswerType, ExamType, StudentExamLinkType, UserType } from "@/utils/type";
import { User, UserResponse } from "@supabase/supabase-js";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function calculation() {
  const params = useSearchParams()
  const examId = params.get('id')
  const [user, setUser] = useState<UserType>()
  const [questions, setQuestions] = useState<AnswerType[]>()
  const [totalMark, setTotalMark] = useState<number>(0); // State to store total mark

  useEffect(() => {
    if (!user) getUserData().then(setUser)
  }, [])
  const userRole = useMemo(() => user?.role, [user])
  useEffect(() => {
    if (examId && !questions && userRole === 'teacher') {
      getTeacherExams(examId).then(setQuestions)
    }
  }, [userRole])
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
  const getTeacherExams = useCallback(async (examId: string): Promise<AnswerType[] | undefined> => {
    const { data, error } = await supabase.from('student_exam_link').select('answers').eq('id', examId).single()
    if (error) {
      console.error(error)
      return
    }
    return data.answers as any
  }, [])
  const onSubmit = (e: any) => {
    e.preventDefault()
    if (userRole !== 'teacher') {
      toast.error('Only teachers can change mark')
      return
    }
    let updated = false
    const answers = questions?.map(question => {
      const marks = e.target[question.question_id].value
      if (marks !== question.marks) {
        updated = true
      }
      return ({
        question: question.question,
        question_id: question.question_id,
        answer: question.answer,
        marks: e.target[question.question_id].value as number
      })
    }) || []
    if (updated) submitAnswers(answers, examId as string)
    else toast.error('No changes made')
  }

  const calculateTotalMark = () => {
    let total = 0;
    questions?.forEach(question => {
      const mark = parseInt((document.getElementById(question.question_id) as HTMLInputElement)?.value || '0');
      total += mark;
    });
    return total;
  }

  const handleCalculateTotal = () => {
    const totalMark = calculateTotalMark();
    setTotalMark(totalMark); // Set the total mark in state
  }

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-center">Score Evaluation</h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          {questions?.map((question, index) => (
            <div key={question.question_id} className="grid grid-cols-[auto_1fr] items-center gap-4">
              <div>
                <span className="font-medium">{index + 1}. {question.question}? ({question.totalMark})</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Mark:</span>
                <Input
                  className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-primary"
                  placeholder="mark"
                  max={question.totalMark}
                  type="number"
                  id={question.question_id}
                  defaultValue={question.marks}
                  data-mark={question.marks} // Added data-mark attribute
                />
              </div>
              <div>
                <span className="font-medium">Answer:</span>
                <span className="text-gray-500">{question.answer}</span>
              </div>
            </div>
          ))}
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" type="button" onClick={handleCalculateTotal}>
              Calculate Total
            </button>
            <div className="flex items-center gap-2">
              <span>Total Mark:</span>
              <span>{totalMark}</span>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

async function submitAnswers(data: StudentExamLinkType['answers'], examId: string) {
  const { status, error } = await supabase.from('student_exam_link').update({ answers: data }).eq('id', examId)
  if (error) toast.error(error.message)
  if (status !== 204) toast.error('Something went wrong')
  if (status === 204) toast.success('Marks updated successfully')
}
