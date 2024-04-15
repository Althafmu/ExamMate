import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { JSX, SVGProps } from "react"
import Link from "next/link"

export default function Profile() {
  return (
    <Card>
      <CardContent className="p-12 flex flex-col items-center justify-center space-y-4">
        <UserCircleIcon className="w-12 h-12" />
        <div className="flex flex-col items-center space-y-1">
          <h3 className="text-lg font-bold tracking-wide">Calvin Guerrero</h3>
          <p className="text-sm font-medium leading-none text-gray-500">@calvinguerrero</p>
        </div>
        <Link href="/profileinfo">
          <Button size="sm" variant="outline">
            Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function UserCircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}
