export type QuestionTypeGenerated = {
    answer: string
    difficulty: string
    question_number: string | number
    question_text: string
    topic: string
}
export type StudentExamLinkType = {
    student_id: string
    exam_code: string
    answers: {
        question: string
        question_id: string
        answer: string
        marks: number
    }[]
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
    teacher_id?: string
}

export type AnswerType = {
    question: string
    question_id: string
    answer: string
    marks: string
}
// [
//     {
//         "id": "51e0c799-ba57-4c0f-bc8e-b35f2586a524",
//         "created_at": "2024-05-07T17:54:57.624313+00:00",
//         "student_id": "57ca072f-60c0-402c-a373-27e99c49603c",
//         "answers": [
//             {
//                 "marks": "9",
//                 "answer": "something",
//                 "question": "Explain the concept of Byzantine agreement in distributed systems, providing an example to illustrate your understanding.",
//                 "question_id": "44c2df80-a42d-41ec-912a-8b9e8582bc00"
//             },
//             {
//                 "marks": "6",
//                 "answer": "christmas\n",
//                 "question": "Describe the different types of failure models in distributed systems and their implications on the system's behavior.",
//                 "question_id": "11ef332d-8364-46c7-828d-666ad138d7df"
//             }
//         ],
//         "exam_code": "CROS",
//         "exams": {
//             "id": "1437d085-1bb2-4656-b7f9-1ed6394e2d9c",
//             "code": "CROS",
//             "date": null,
//             "title": "HAS",
//             "status": null,
//             "created_at": "2024-05-07T13:07:24.059196+00:00",
//             "teacher_id": "57ca072f-60c0-402c-a373-27e99c49603c"
//         }
//     }
// ]
export type StudentMarksType = {
    id: string
    answers: AnswerType[]
    exam_code: string
    exams: ExamType
}