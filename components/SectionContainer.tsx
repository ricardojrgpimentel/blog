import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <>
      <header className="fixed z-10 py-1 top-0 border-b border-gray-200 dark:border-gray-900 w-full bg-white bg-opacity-95 dark:bg-black dark:bg-opacity-90 flex items-center justify-between">
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:block">
            <Link
              href="/"
              aria-label="Home"
              className="p-1 uppercase text-xs font-bold text-bigTitle sm:p-4 dark:text-gray-100"
            >
              Home
            </Link>
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="p-1 uppercase text-xs font-bold text-bigTitle sm:p-4 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
        <h1 className="font-black text-xs px-4 text-bigTitle dark:text-gray-100 uppercase text-center">
          Ricardo Pimentel
        </h1>
      </header>
      <div className="max-w-3xl mt-20 px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">{children}</div>
    </>
  )
}
