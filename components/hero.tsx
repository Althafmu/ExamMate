/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2PTqKn8xqBo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1">
        <div className="container flex flex-col items-center py-8 space-y-4 px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter">Examate</h1>
          <p className="text-gray-500 dark:text-gray-400">Provide text to generate question paper</p>
          <div className="w-full max-w-3xl space-y-4">
            <textarea
              className="w-full min-h-[200px] max-h-[400px] border-gray-200 border resize-y shadow-sm dark:border-gray-800"
              placeholder="Enter your text here..."
            />
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button>Generate</Button>
              <Button variant="outline">Upload PDF</Button>
            </div>
            <div className="grid w-full gap-4">
              <h2 className="text-2xl font-semibold">Output</h2>
              <div className="border border-dashed border-gray-200 w-full p-4 rounded-lg dark:border-gray-800" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}