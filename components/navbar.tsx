import Link from "next/link";


export default function Nav() {
  return (
    <nav className="flex items-center h-14 px-4 border-b bg-white w-full dark:bg-gray-950 md:h-20 md:px-6 lg:justify-end">
      <div className="flex-1 text-sm font-semibold">Examate</div>
      <nav className="hidden flex flex-1 items-center justify-center space-x-4 lg:flex lg:space-x-6">
        <Link
          className="font-semibold px-4 py-2 rounded-full"
          href="/about"
          style={{
            background: "#f3f4f6",
          }}
        >
          about us
        </Link>
      </nav>
      <div className="ml-auto">
        <Link
          className="font-semibold px-4 py-2 rounded-full"
          href="/auth"
          style={{
            background: "#f3f4f6",
          }}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
