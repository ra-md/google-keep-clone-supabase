import React, { useEffect, useState } from 'react'
import { Menu, LogOut } from 'react-feather'
import { sidebarAtom } from './Sidebar/sidebarAtom'
import Button from './Button'
import SearchNote from '../features/Note/components/SearchNote'
import { useAtom } from 'jotai'
import { supabase } from '../lib/supabaseClient'

export default function Header() {
  const [openSidebar, setOpenSidebar] = useAtom(sidebarAtom)
  const [scrollY, setScrollY] = useState(0)
  let border = scrollY > 0 ? 'shadow-lg-darker' : 'border-b'

  const handleSetScrollY = () => setScrollY(window.scrollY)

  const handleLogout = () => supabase.auth.signOut()

  const toggleSidebar = () => setOpenSidebar(!openSidebar)

  useEffect(() => {
    window.addEventListener('scroll', handleSetScrollY, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleSetScrollY);
    };
  }, []);

  return (
    <>
      <header className={`bg-primary sticky top-0 border-secondary z-30 ${border}`}>
        <div className='py-2 px-6 grid grid-cols-5 justify-center items-center'>
          <Button
            dataTip='Main menu'
            icon={<Menu />}
            className='justify-self-start'
            aria-label='open menu'
            onClick={toggleSidebar}></Button>
          <div className='col-span-3'>
            <SearchNote />
          </div>
          <Button
            dataTip='Log Out'
            icon={<LogOut />}
            className='justify-self-end'
            aria-label='LogOut'
            onClick={handleLogout}
          ></Button>
        </div>
      </header>
    </>
  )
}
