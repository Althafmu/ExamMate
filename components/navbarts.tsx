/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/rpGMO6PIJTv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { JSX, SVGProps } from 'react';

export default function navbarts() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-gray-900 px-4 md:px-6">
      <Link className="text-lg font-bold text-white" href="#">
        EXAMATE
      </Link>
      <Link className="text-lg font-bold text-white" href="/auth">
        <Button className="text-white" size="icon" variant="ghost">
          <LogOutIcon className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </Link>
    </header>
  );
}

function LogOutIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}
