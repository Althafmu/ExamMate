import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function profile_info() {
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
          <div className="border-t border-gray-200 dark:border-gray-800">
            <div className="grid items-center gap-2 py-4 grid-cols-3">
              <div className="font-semibold">Exam</div>
              <div className="font-semibold text-center">Date</div>
              <div className="font-semibold text-right">Marks</div>
              <div>Mathematics</div>
              <div className="text-center">2023-05-10</div>
              <div className="text-right">95%</div>
              <div>Science</div>
              <div className="text-center">2023-05-15</div>
              <div className="text-right">88%</div>
              <div>History</div>
              <div className="text-center">2023-05-20</div>
              <div className="text-right">91%</div>
            </div>
          </div>
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
