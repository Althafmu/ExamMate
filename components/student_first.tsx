'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/joLQ1XXDBdU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { supabase } from "@/utils/supabase"
import { ExamType } from "@/utils/type"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function Component() {
  const [exams, setExams] = useState<ExamType[]>()
  useEffect(() => {
    if (!exams)
      getExams().then(setExams)
  }, [])
  return (
    <div key="1" className="px-4 py-6 md:px-6 md:py-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl text-center">Examate</h1>
        <div className="flex justify-start mt-12">
          {exams?.map((exam) => (
            <div className="ml-20 mt-10" key={exam.id}>
              <p className="text-gray-500 dark:text-gray-400">Exam: {exam.title}</p>
              <div className="mt-4">
                <Link href={`/exam?code=${exam.code}`}>
                  <Button>Open</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

async function getExams(): Promise<ExamType[] | undefined> {
  const { data, error } = await supabase.from('exams').select('*')
  if (error) {
    toast.error(error.message)
    return
  }
  return data
}

