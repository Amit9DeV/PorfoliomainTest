import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


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
      <Drawer>
      
      <div className='border w-full h-[1px] absolute top-9'></div>
      <DrawerTrigger className="backdrop-blur-3xl text-red-500 border p-2 font-bold mt-5 ">Do Not Click</DrawerTrigger>
      <DrawerContent className="flex items-center justify-between p-3 px-9 md:p-7 mt-1 border backdrop-blur-2xl  ">
        <nav aria-label="Global" className="flex items-center justify-between p-3 px-9 md:p-7 mt-1 border backdrop-blur-2xl  " >
          <div className="flex gap-3 items-center justify-center md:gap-x-12">
            {navigation.map((item) => (
              <NavLink  key={item.name} to={item.href} className="text-lg font-semibold leading-6 border-b-2 hover:border-b-pink-600 text-white hover:text-yellow-600 ">
                {item.name}
              </NavLink>
            ))}
          </div>

        </nav>
        </DrawerContent>
        </Drawer>
      </header>

    
</>
  )
}
