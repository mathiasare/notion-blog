import { useState, useCallback, useEffect } from 'react'
import { useDarkMode } from '@/lib/use-dark-mode'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import * as types from 'notion-types'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { name: 'Blogi', href: '/' },
  { name: 'Minust', href: '/about' },
  { name: 'Kontakt', href: '/contact' },
]

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className='w-10 h-10'
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <MoonIcon/> : <SunIcon/>}
    </div>
  )
}


export default function PageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const onToggleTheme = useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <header className="navigation-bar">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Profile image</span>
            <Image className="rounded-full" height={48} width={48} src="https://github.com/mathiasare.png" alt="profile image" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 navigation-bar-element"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900 navigation-bar-element">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ToggleThemeButton/>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 navigation-bar">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Profile image</span>
              <Image className="rounded-full" 
                height={56} 
                width={56}
                quality={100}
                src="https://github.com/mathiasare.png"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 navigation-bar-element" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 navigation-bar-element">
                <ToggleThemeButton/>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}