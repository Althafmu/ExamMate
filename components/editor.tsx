/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/8TyaDV0rrgh
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Editor() {
  return (
    <div className="w-full max-w-7xl px-4 mx-auto lg:grid lg:gap-4 lg:px-6 lg:grid-cols-2">
      <div className="border lg:border-0 lg:rounded lg:overflow-hidden">
        <div className="p-4 space-y-4 lg:p-10">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-information">Contact Information</Label>
            <Textarea className="min-h-[100px]" id="contact-information" placeholder="Enter your contact information" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea className="min-h-[100px]" id="summary" placeholder="Enter your summary" />
          </div>
        </div>
        <div className="border-t">
          <div className="p-4 space-y-4 lg:p-10">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Textarea className="min-h-[100px]" id="education" placeholder="Enter your education" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Work Experience</Label>
                <Textarea className="min-h-[100px]" id="experience" placeholder="Enter your work experience" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Textarea className="min-h-[100px]" id="skills" placeholder="Enter your skills" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 lg:p-10">
        <div className="grid max-w-sm gap-4 lg:max-w-md">
          <div className="grid gap-1.5">
            <div className="text-3xl font-bold">Jane Doe</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</div>
          </div>
          <div className="grid gap-1.5">
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <div className="grid gap-0.5">
              <div>Email: janedoe@example.com</div>
              <div>Phone: +1 (123) 456-7890</div>
              <div>Address: 123 Street, City, Country</div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Summary</h2>
            <p className="text-sm">
              Creative and detail-oriented software engineer with a passion for developing innovative web applications.
              Experienced in full-stack development and dedicated to writing clean and efficient code.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Education</h2>
            <p className="text-sm">B.S. in Computer Science - University of Excellence (2010-2014)</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Work Experience</h2>
            <p className="text-sm">
              Software Engineer - Tech Innovators Inc. (2014-2016)
              <br />- Led the development of a cutting-edge e-commerce platform
              <br />- Collaborated with cross-functional teams to deliver high-quality software solutions
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Skills</h2>
            <ul className="text-sm list-disc list-inside">
              <li>JavaScript</li>
              <li>React.js</li>
              <li>Node.js</li>
              <li>HTML/CSS</li>
              <li>Agile Methodology</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
