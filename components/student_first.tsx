/**
 * v0 by Vercel.
 * @see https://v0.dev/t/joLQ1XXDBdU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div key="1" className="px-4 py-6 md:px-6 md:py-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl text-center">Examate</h1>
        <div className="flex justify-start mt-12">
          <div className="ml-20 mt-10">
            <p className="text-gray-500 dark:text-gray-400">Exam: [exam title]</p>
            <div className="mt-4">
              <Link href="/exam">
                <Button>Open</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
