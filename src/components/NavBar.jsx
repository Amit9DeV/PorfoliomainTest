import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/About' },
  { name: 'Projects', href: '/Projects' },
  { name: 'Contact', href: '/Contact' },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
<>
      <header className="absolute inset-x-0 top-0 z-50 flex lg:justify-center justify-end ">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 md:justify-start " >

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <NavLink  key={item.name} to={item.href} className="text-lg font-semibold leading-6 border-b hover:border-b-pink-700 text-white hover:text-yellow-900 ">
                {item.name}
              </NavLink>
            ))}
          </div>

        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden   ">
          <div className="fixed inset-0 z-50  " />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-auto h-1/3 overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 bg-black ">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root  ">
              <div className="-my-6 divide-y divide-gray-500/10 hover:text-gray-900  ">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink-700 hover:text-cyan-700"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

    
</>
  )
}
