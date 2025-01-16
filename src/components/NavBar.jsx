import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/About' },
  { name: 'Projects', href: '/Projects' },
  { name: 'Contact', href: '/Contact' },
]

export default function NavBar() {

  return (
<>
      <header className="absolute inset-x-0 top-0 z-50 flex justify-center  ">
        <nav aria-label="Global" className="flex items-center justify-between p-3 px-9 md:p-7 mt-1 border backdrop-blur-2xl  " >
          <div className="flex gap-3 items-center justify-center md:gap-x-12">
            {navigation.map((item) => (
              <NavLink  key={item.name} to={item.href} className="text-lg font-semibold leading-6 border-b-2 hover:border-b-pink-600 text-white hover:text-yellow-600 ">
                {item.name}
              </NavLink>
            ))}
          </div>

        </nav>

      </header>

    
</>
  )
}
