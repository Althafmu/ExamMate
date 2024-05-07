export type QuestionTypeGenerated = {
    answer: string
    difficulty: string
    question_number: string | number
    question_text: string
    topic: string
}
export type QuestionTypeExam = {
    id: string
    teacher_id: string
    exam_id: string
    question: string
}
export type UserType = {
    id: string
    role: string
    name: string
    institution: string
    institution_id: string
    email: string
    created_at: string
}
export type ExamType = {
    id: string
    title: string
    code: string
    created_at?: string
    teacher_id: string
}