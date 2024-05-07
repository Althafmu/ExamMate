'use client'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { supabase } from "@/utils/supabase"
import { StudentMarksType, UserType } from "@/utils/type"
import { User, UserResponse } from "@supabase/supabase-js"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

export default function profile_info() {
  const [user, setUser] = useState<UserType>()
  const [exams, setExams] = useState<StudentMarksType[]>()
  const userRole = useMemo(() => user?.role, [user])
  const userId = useMemo(() => user?.id, [user])
  useEffect(() => {
    if (!user) getUserData().then(setUser)
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
  useEffect(() => {
    if (userId && userRole === 'student') {
      getStudentMarks(userId).then(setExams)
    }
  }, [user])
  return (
    <div className="flex justify-center mt-8">
      <Card className="w-full max-w-3xl">
        <CardHeader className="pb-0">
          <CardTitle>Profile</CardTitle>
          <CardDescription>View your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <p className="font-semibold">Alice Smith</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <p>alice@example.com</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="school">School/College</Label>
            <p>East High School</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-id">Student ID</Label>
            <p>EH123456</p>
          </div>
          {exams && <div className="border-t border-gray-200 dark:border-gray-800">
            <div className="grid items-center gap-2 py-4 grid-cols-3">
              <div className="font-semibold">Exam</div>
              <div className="font-semibold text-center">Date</div>
              <div className="font-semibold text-right">Marks</div>
              {exams?.map(exam => <Marks key={exam.id} exam={exam} />)}
            </div>
          </div>}
        </CardContent>
        <CardFooter>
          <Link className="btn outline" href="#">
            Edit Profile
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
const Marks = ({ exam }: { exam: StudentMarksType }) => {
  const total = useMemo(() => 100, [exam])
  const totalMarks = useMemo(() => exam.answers.reduce((a, b) => a + parseInt(b.marks), 0), [exam])
  const percentage = useMemo(() => (totalMarks / total) * 100, [total, totalMarks])
  return (
    <>
      <div>{exam.exams.title}</div>
      <div className="text-center"></div>
      <div className="text-right">{percentage}%</div>
    </>
  )
}
async function getStudentMarks(userId: string): Promise<StudentMarksType[] | undefined> {
  const { data, error } = await supabase.from('student_exam_link').select('id,answers,exams(id,code,title)').eq('student_id', userId)
  if (error) {
    toast.error(error.message)
    return
  }
  if (Array.isArray(data)) return data as any
}