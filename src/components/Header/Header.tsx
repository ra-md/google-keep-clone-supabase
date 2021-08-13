import React, { useEffect, useState } from 'react'
import { Menu, LogOut } from 'react-feather'
import { sidebarAtom } from '../Sidebar/sidebarAtom'
import Button from '../Button'
import SearchNote from './SearchNote'
import { useAtom } from 'jotai'
import {supabase} from '../../lib/supabaseClient'

export default function Header() {
  const [openSidebar, setOpenSidebar] = useAtom(sidebarAtom)
  const [scrollY, setScrollY] = useState(0)
  let border = scrollY > 0 ? 'shadow-lg-darker' : 'border-b'

  function handleSetScrollY() {
    setScrollY(window.scrollY)
  }

  function handleLogout() {
    supabase.auth.signOut()
  }

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
            icon={true}
            className='justify-self-start'
            aria-label='open menu'
            onClick={() => {
              setOpenSidebar(!openSidebar)
            }}>
            <Menu />
          </Button>
          <div className='col-span-3'>
            <SearchNote />
          </div>
          <Button
            dataTip='Log Out'
            icon={true}
            className='justify-self-end'
            aria-label='LogOut'
            onClick={handleLogout}
          >
            <LogOut />
          </Button>
        </div>
      </header>
    </>
  )
}
