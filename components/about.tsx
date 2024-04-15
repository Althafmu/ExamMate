/**
 * v0 by Vercel.
 * @see https://v0.dev/t/h8BHiWqsM3f
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function about() {
  return (
    <div className="py-6 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Us</h1>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We are on a mission to revolutionize the way exams are conducted and evaluated. Our platform provides a
                seamless experience for both teachers and students, making the examination process efficient, effective,
                and fair.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
              <p className="max-w-prose text-gray-500 md:text-xl/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We aim to provide a user-friendly platform for teachers to create high-quality question papers quickly
                and effortlessly. Additionally, we strive to enhance the learning experience for students by providing a
                fair and transparent platform for them to demonstrate their knowledge and skills.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">How It Works</h2>
              <p className="max-w-prose text-gray-500 md:text-xl/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Teachers can upload PDFs containing study material, and our platform automatically generates question
                papers based on the uploaded content. Teachers can then select questions from the generated question
                papers to create customized question papers for their students.
              </p>
              <p className="max-w-prose text-gray-500 md:text-xl/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Students can access the question papers online, answer them, and submit their responses. Our AI-powered
                system evaluates the answers and provides instant feedback to the students, helping them understand
                their strengths and areas for improvement.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Join Us</h2>
              <p className="max-w-prose text-gray-500 md:text-xl/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join us in revolutionizing the examination process. Whether you are a teacher looking for a more
                efficient way to create question papers or a student seeking a fair and transparent evaluation system,
                our platform is here to cater to your needs. Experience the future of examinations with us!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}